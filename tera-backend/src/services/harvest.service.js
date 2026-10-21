/**
 * Harvest Submission & Communal Crate Service
 */
const harvestRepo = require('../repositories/harvest.repository');
const quotaRepo = require('../repositories/quota.repository');
const missionRepo = require('../repositories/mission.repository');
const notificationRepo = require('../repositories/notification.repository');
const walletRepo = require('../repositories/wallet.repository');
const visionService = require('./vision.service');
const ApiError = require('../utils/api-error');

class HarvestService {
  async getSubmissionById(id) {
    const item = await harvestRepo.findById(id);
    if (!item) throw ApiError.notFound('Data setoran panen tidak ditemukan.');
    return item;
  }

  async getMySubmissions(userId, limit = 20, offset = 0) {
    return harvestRepo.findByUserId(userId, limit, offset);
  }

  async getClusterSubmissions(clusterId, status) {
    return harvestRepo.findByClusterId(clusterId, status);
  }

  async getSubmissionByQr(qrTicketCode) {
    const item = await harvestRepo.findByQrCode(qrTicketCode);
    if (!item) throw ApiError.notFound('Tiket QR tidak valid atau tidak ditemukan.');
    return item;
  }

  /**
   * Submit new harvest batch and issue QR Ticket
   */
  async createSubmission(userId, { cluster_id, quota_id, crop_name, claimed_weight_kg, photo_url, sample_type, vision_metrics, visionMetrics }) {
    if (!claimed_weight_kg || Number(claimed_weight_kg) <= 0) {
      throw ApiError.badRequest('Bobot panen harus lebih besar dari 0 kg.');
    }

    // Ensure valid UUID or null for foreign keys
    const isValidUUID = (str) => typeof str === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
    const validClusterId = isValidUUID(cluster_id) ? cluster_id : null;
    const validQuotaId = isValidUUID(quota_id) ? quota_id : null;

    // Generate readable Ticket QR Code: TT-<cluster_id>-<random>
    const qrTicketCode = `TT-${(cluster_id || 'RW07').toString().slice(-4).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const submission = await harvestRepo.create({
      user_id: userId,
      cluster_id: validClusterId,
      quota_id: validQuotaId,
      crop_name,
      claimed_weight_kg,
      photo_url: photo_url || null,
      qr_ticket_code: qrTicketCode,
    });

    // Run AI analysis if photo or sample provided
    const aiAnalysis = await visionService.analyzeHarvestQuality({
      sampleType: sample_type,
      imageUrl: photo_url,
      cropName: crop_name,
      estimatedWeightKg: claimed_weight_kg,
      visionMetrics: vision_metrics || visionMetrics,
    });

    // Map AI 8-tier grade to PostgreSQL harvest_grade enum (GRADE_A_PLUS, GRADE_A, GRADE_B, GRADE_C)
    let dbGrade = 'GRADE_A';
    if (aiAnalysis?.grade) {
      const g = aiAnalysis.grade.toString().toUpperCase();
      if (g.includes('A_PLUS') || g === 'A+') dbGrade = 'GRADE_A_PLUS';
      else if (g.includes('A')) dbGrade = 'GRADE_A';
      else if (g.includes('B')) dbGrade = 'GRADE_B';
      else dbGrade = 'GRADE_C';
    }

    const updated = await harvestRepo.updateAIValidation(submission.id, {
      ai_validated_weight_kg: claimed_weight_kg,
      ai_quality_grade: dbGrade,
      ai_confidence_score: aiAnalysis.confidenceScore || 0.96,
      ai_analysis_notes: aiAnalysis.notes || aiAnalysis.recommendation,
    });

    // Award +75 XP for AI validation mission
    await missionRepo.awardXP(userId, 75);

    // Notify user
    await notificationRepo.create({
      user_id: userId,
      type: 'HARVEST',
      title: 'Tiket Setor Panen Diterbitkan',
      message: `Tiket QR #${qrTicketCode} untuk ${claimed_weight_kg} kg ${crop_name} siap dipindai di Lumbung.`,
      reference_id: submission.id,
    });

    return {
      ...updated,
      ai_details: aiAnalysis,
    };
  }

  /**
   * RW Hub Officer conducts physical scale check
   */
  async physicalCheck(submissionId, checkerId, { physical_checked_weight }) {
    const submission = await harvestRepo.findById(submissionId);
    if (!submission) throw ApiError.notFound('Setoran tidak ditemukan.');

    const updated = await harvestRepo.updatePhysicalCheck(submissionId, {
      physical_checked_weight,
      physical_checked_by: checkerId,
    });

    return updated;
  }

  /**
   * Distributor or Admin confirms harvest, updates quota, and credits farmer escrow
   */
  async confirmHarvest(submissionId, adminId, payoutAmount) {
    const submission = await harvestRepo.findById(submissionId);
    if (!submission) throw ApiError.notFound('Setoran tidak ditemukan.');

    const finalPayout = payoutAmount || submission.payout_amount || (Number(submission.claimed_weight_kg) * 28500);

    const updated = await harvestRepo.updateStatus(submissionId, 'CONFIRMED', {
      confirmed_by_admin: adminId,
      payout_amount: finalPayout,
    });

    // If linked to quota, increment quota collected weight
    if (submission.quota_id) {
      await quotaRepo.addWeight(submission.quota_id, submission.physical_checked_weight || submission.claimed_weight_kg);
    }

    // Release escrow payout to user wallet
    await walletRepo.releaseEscrow(submission.user_id, submission.id, finalPayout);

    // Notify user
    await notificationRepo.create({
      user_id: submission.user_id,
      type: 'WALLET',
      title: 'Hasil Panen Telah Terverifikasi!',
      message: `Dana pelepasan escrow sebesar Rp ${Number(finalPayout).toLocaleString('id-ID')} telah ditambahkan ke saldo dompet Anda.`,
      reference_id: submission.id,
    });

    return updated;
  }

  async rejectHarvest(submissionId, reason) {
    const updated = await harvestRepo.updateStatus(submissionId, 'REJECTED', {
      rejection_reason: reason,
    });
    return updated;
  }

  async getClusterSummary(clusterId) {
    return harvestRepo.getClusterSummary(clusterId);
  }
}

module.exports = new HarvestService();
