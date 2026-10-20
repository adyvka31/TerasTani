/**
 * Gamification Controller
 */
const gamificationService = require('../services/gamification.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class GamificationController {
  getMissions = asyncHandler(async (req, res) => {
    const list = await gamificationService.getUserMissions(req.user.id);
    return ApiResponse.success(res, 'Daftar misi berhasil dimuat', list);
  });

  claim = asyncHandler(async (req, res) => {
    const result = await gamificationService.claimMission(req.user.id, req.params.missionId);
    return ApiResponse.success(res, 'Misi berhasil diklaim', result);
  });

  getLeaderboard = asyncHandler(async (req, res) => {
    const clusterId = req.query.clusterId || null;
    const limit = parseInt(req.query.limit, 10) || 10;
    const leaderboard = await gamificationService.getLeaderboard(clusterId, limit);
    return ApiResponse.success(res, 'Papan peringkat berhasil dimuat', leaderboard);
  });
}

module.exports = new GamificationController();
