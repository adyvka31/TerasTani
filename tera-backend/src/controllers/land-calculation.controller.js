/**
 * Land Calculation Controller
 */
const landCalcService = require('../services/land-calculation.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class LandCalculationController {
  getUserCalculations = asyncHandler(async (req, res) => {
    const list = await landCalcService.getUserCalculations(req.user.id);
    return ApiResponse.success(res, 'Daftar kalkulasi lahan berhasil dimuat', list);
  });

  getById = asyncHandler(async (req, res) => {
    const calc = await landCalcService.getCalculationById(req.params.id);
    return ApiResponse.success(res, 'Detail kalkulasi berhasil dimuat', calc);
  });

  create = asyncHandler(async (req, res) => {
    const calc = await landCalcService.createCalculation(req.user.id, req.body);
    return ApiResponse.created(res, 'Rencana budidaya berhasil disimpan (+50 XP)', calc);
  });

  remove = asyncHandler(async (req, res) => {
    await landCalcService.deleteCalculation(req.params.id, req.user.id);
    return ApiResponse.success(res, 'Kalkulasi berhasil dihapus');
  });
}

module.exports = new LandCalculationController();
