/**
 * Crop Catalog Service
 */
const cropRepository = require('../repositories/crop.repository');
const ApiError = require('../utils/api-error');

class CropService {
  async getAllCrops() {
    return cropRepository.findAll();
  }

  async getCropBySlug(slug) {
    const crop = await cropRepository.findBySlug(slug);
    if (!crop) throw ApiError.notFound('Komoditas tanaman tidak ditemukan.');
    return crop;
  }
}

module.exports = new CropService();
