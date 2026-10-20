/**
 * Land Calculation Service
 */
const landCalcRepo = require('../repositories/land-calculation.repository');
const missionRepo = require('../repositories/mission.repository');
const ApiError = require('../utils/api-error');

class LandCalculationService {
  async getUserCalculations(userId) {
    return landCalcRepo.findByUserId(userId);
  }

  async getCalculationById(id) {
    const calc = await landCalcRepo.findById(id);
    if (!calc) throw ApiError.notFound('Kalkulasi lahan tidak ditemukan.');
    return calc;
  }

  async createCalculation(userId, data) {
    const calculation = await landCalcRepo.create({
      user_id: userId,
      land_area_sqm: data.land_area_sqm,
      land_type: data.land_type || 'balkon',
      sunlight_hours: data.sunlight_hours,
      recommended_crop: data.recommended_crop,
      estimated_yield_kg: data.estimated_yield_kg,
      estimated_revenue: data.estimated_revenue || 0,
      planting_schedule: data.planting_schedule || null,
      ai_raw_analysis: data.ai_raw_analysis || null,
    });

    // Award +50 XP for planning
    await missionRepo.awardXP(userId, 50);

    return calculation;
  }

  async deleteCalculation(id, userId) {
    const deleted = await landCalcRepo.delete(id, userId);
    if (!deleted) throw ApiError.notFound('Kalkulasi tidak ditemukan atau bukan milik Anda.');
    return deleted;
  }
}

module.exports = new LandCalculationService();
