/**
 * Quota Controller
 */
const quotaService = require('../services/quota.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class QuotaController {
  getAllOpen = asyncHandler(async (req, res) => {
    const list = await quotaService.getAllOpenQuotas();
    return ApiResponse.success(res, 'Daftar kuota terbuka berhasil dimuat', list);
  });

  getByCluster = asyncHandler(async (req, res) => {
    const list = await quotaService.getQuotasByCluster(req.params.clusterId);
    return ApiResponse.success(res, 'Kuota klaster berhasil dimuat', list);
  });

  getMyQuotas = asyncHandler(async (req, res) => {
    const list = await quotaService.getMyQuotas(req.user.id);
    return ApiResponse.success(res, 'Daftar kuota distributor berhasil dimuat', list);
  });

  getById = asyncHandler(async (req, res) => {
    const quota = await quotaService.getQuotaById(req.params.id);
    return ApiResponse.success(res, 'Detail kuota berhasil dimuat', quota);
  });

  create = asyncHandler(async (req, res) => {
    const created = await quotaService.createQuota(req.user.id, req.body);
    return ApiResponse.created(res, 'Kuota pengadaan berhasil dibuka', created);
  });

  book = asyncHandler(async (req, res) => {
    const updated = await quotaService.bookQuota(req.params.id, req.body.booking_kg || 10);
    return ApiResponse.success(res, 'Booking kuota berhasil dikunci', updated);
  });
}

module.exports = new QuotaController();
