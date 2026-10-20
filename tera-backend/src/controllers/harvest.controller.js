/**
 * Harvest Controller
 */
const harvestService = require('../services/harvest.service');
const visionService = require('../services/vision.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class HarvestController {
  getMySubmissions = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = parseInt(req.query.offset, 10) || 0;
    const items = await harvestService.getMySubmissions(req.user.id, limit, offset);
    return ApiResponse.success(res, 'Daftar setoran panen berhasil dimuat', items);
  });

  getById = asyncHandler(async (req, res) => {
    const item = await harvestService.getSubmissionById(req.params.id);
    return ApiResponse.success(res, 'Detail setoran berhasil dimuat', item);
  });

  getByQr = asyncHandler(async (req, res) => {
    const item = await harvestService.getSubmissionByQr(req.params.qrCode);
    return ApiResponse.success(res, 'Tiket QR valid', item);
  });

  createSubmission = asyncHandler(async (req, res) => {
    const submission = await harvestService.createSubmission(req.user.id, req.body);
    return ApiResponse.created(res, 'Tiket setor panen berhasil diterbitkan', submission);
  });

  analyzePhoto = asyncHandler(async (req, res) => {
    const analysis = await visionService.analyzeHarvestQuality(req.body);
    return ApiResponse.success(res, 'Inspeksi kualitas AI selesai', analysis);
  });

  physicalCheck = asyncHandler(async (req, res) => {
    const updated = await harvestService.physicalCheck(req.params.id, req.user.id, req.body);
    return ApiResponse.success(res, 'Penimbangan fisik lumbung berhasil dicatat', updated);
  });

  confirmSubmission = asyncHandler(async (req, res) => {
    const updated = await harvestService.confirmHarvest(req.params.id, req.user.id, req.body.payout_amount);
    return ApiResponse.success(res, 'Setoran panen dikonfirmasi & dana escrow dicairkan', updated);
  });

  rejectSubmission = asyncHandler(async (req, res) => {
    const updated = await harvestService.rejectHarvest(req.params.id, req.body.reason);
    return ApiResponse.success(res, 'Setoran panen ditolak', updated);
  });

  getClusterSummary = asyncHandler(async (req, res) => {
    const summary = await harvestService.getClusterSummary(req.params.clusterId);
    return ApiResponse.success(res, 'Ringkasan lumbung klaster berhasil dimuat', summary);
  });
}

module.exports = new HarvestController();
