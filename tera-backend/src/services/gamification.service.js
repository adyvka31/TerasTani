/**
 * Gamification & Mission Service
 */
const missionRepo = require('../repositories/mission.repository');
const notificationRepo = require('../repositories/notification.repository');
const ApiError = require('../utils/api-error');

class GamificationService {
  async getActiveMissions() {
    return missionRepo.findAllActive();
  }

  async getUserMissions(userId) {
    return missionRepo.getUserMissions(userId);
  }

  async claimMission(userId, missionId) {
    const mission = await missionRepo.findById(missionId);
    if (!mission) throw ApiError.notFound('Misi tidak ditemukan.');

    const claim = await missionRepo.claimMission(userId, missionId);
    if (!claim) {
      throw ApiError.badRequest('Misi ini sudah pernah diklaim sebelumnya.');
    }

    // Award XP
    const updatedUser = await missionRepo.awardXP(userId, mission.reward_xp);

    // Notify
    await notificationRepo.create({
      user_id: userId,
      type: 'MISSION',
      title: 'Hadiah Misi Berhasil Diklaim!',
      message: `Selamat! Anda mendapatkan +${mission.reward_xp} XP dari misi "${mission.title}".`,
      reference_id: mission.id,
    });

    return {
      claim,
      awardedXp: mission.reward_xp,
      userLevel: updatedUser?.user_level,
      totalXp: updatedUser?.xp_points,
    };
  }

  async getLeaderboard(clusterId, limit = 10) {
    return missionRepo.getLeaderboard(clusterId, limit);
  }
}

module.exports = new GamificationService();
