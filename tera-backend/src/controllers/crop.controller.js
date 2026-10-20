/**
 * Crop Controller
 */
const cropService = require('../services/crop.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class CropController {
  getAll = asyncHandler(async (req, res) => {
    const crops = await cropService.getAllCrops();
    return ApiResponse.success(res, 'Katalog komoditas berhasil dimuat', crops);
  });

  getBySlug = asyncHandler(async (req, res) => {
    const crop = await cropService.getCropBySlug(req.params.slug);
    return ApiResponse.success(res, 'Detail komoditas berhasil dimuat', crop);
  });
}

module.exports = new CropController();
