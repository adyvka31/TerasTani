/**
 * Distributor Quota Service
 */
const quotaRepo = require('../repositories/quota.repository');
const notificationRepo = require('../repositories/notification.repository');
const ApiError = require('../utils/api-error');

class QuotaService {
  async getAllOpenQuotas() {
    return quotaRepo.findAllOpen();
  }

  async getQuotasByCluster(clusterId) {
    return quotaRepo.findOpenByCluster(clusterId);
  }

  async getMyQuotas(distributorId) {
    return quotaRepo.findByDistributor(distributorId);
  }

  async getQuotaById(id) {
    const quota = await quotaRepo.findById(id);
    if (!quota) throw ApiError.notFound('Alokasi kuota tidak ditemukan.');
    return quota;
  }

  async createQuota(distributorId, data) {
    const newQuota = await quotaRepo.create({
      distributor_id: distributorId,
      cluster_id: data.cluster_id,
      crop_name: data.crop_name,
      target_weight_kg: data.target_weight_kg,
      price_per_kg: data.price_per_kg,
      start_date: data.start_date || new Date(),
      end_date: data.end_date || new Date(Date.now() + 7 * 86400000),
    });
    return newQuota;
  }

  async bookQuota(quotaId, bookingKg) {
    const quota = await quotaRepo.findById(quotaId);
    if (!quota) throw ApiError.notFound('Kuota tidak ditemukan.');
    return quotaRepo.addWeight(quotaId, bookingKg);
  }
}

module.exports = new QuotaService();
