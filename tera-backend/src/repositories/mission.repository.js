/**
 * Mission Repository
 * Encapsulates all direct PostgreSQL queries for `missions` and `user_missions` tables
 */
const { query } = require('../config/db.config');

class MissionRepository {
  async findAllActive() {
    const text = 'SELECT * FROM missions WHERE is_active = true ORDER BY created_at DESC';
    const result = await query(text);
    return result.rows;
  }

  async findById(id) {
    const text = 'SELECT * FROM missions WHERE id = $1 LIMIT 1';
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }

  async create({ title, description, category, reward_xp, reward_balance }) {
    const text = `
      INSERT INTO missions (title, description, category, reward_xp, reward_balance)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await query(text, [title, description, category || 'daily', reward_xp || 0, reward_balance || 0]);
    return result.rows[0];
  }

  async getUserMissions(userId) {
    const text = `
      SELECT m.*,
        CASE 
          WHEN m.category = 'daily' AND um.completed_at < CURRENT_DATE THEN false
          WHEN m.category = 'weekly' AND um.completed_at < date_trunc('week', CURRENT_DATE) THEN false
          ELSE COALESCE(um.is_completed, false)
        END AS is_completed,
        um.completed_at,
        um.progress
      FROM missions m
      LEFT JOIN user_missions um ON um.mission_id = m.id AND um.user_id = $1
      WHERE m.is_active = true
      ORDER BY m.created_at ASC
    `;
    const result = await query(text, [userId]);
    return result.rows;
  }

  async claimMission(userId, missionId) {
    // 1. Get mission category
    const mRes = await query('SELECT category FROM missions WHERE id = $1', [missionId]);
    const mission = mRes.rows[0];
    if (!mission) return null;

    // 2. Check if already claimed in current replenishment period
    const checkText = 'SELECT is_completed, completed_at FROM user_missions WHERE user_id = $1 AND mission_id = $2';
    const checkRes = await query(checkText, [userId, missionId]);
    if (checkRes.rows.length > 0 && checkRes.rows[0].is_completed) {
      const compDate = new Date(checkRes.rows[0].completed_at);
      const now = new Date();
      if (mission.category === 'daily') {
        const isSameDay = compDate.toDateString() === now.toDateString();
        if (isSameDay) return null; // Already claimed today
      } else if (mission.category === 'weekly') {
        const diffDays = (now - compDate) / (1000 * 60 * 60 * 24);
        if (diffDays < 7 && now.getDay() >= compDate.getDay()) return null; // Already claimed this week
      }
    }

    const text = `
      INSERT INTO user_missions (user_id, mission_id, is_completed, completed_at)
      VALUES ($1, $2, true, NOW())
      ON CONFLICT (user_id, mission_id)
      DO UPDATE SET is_completed = true, completed_at = NOW()
      RETURNING *
    `;
    const result = await query(text, [userId, missionId]);
    return result.rows[0] || null;
  }

  async awardXP(userId, xpAmount) {
    const text = `
      UPDATE users
      SET xp_points = xp_points + $2,
          user_level = GREATEST(1, FLOOR((xp_points + $2) / 500) + 1)
      WHERE id = $1
      RETURNING id, xp_points, user_level
    `;
    const result = await query(text, [userId, xpAmount]);
    return result.rows[0] || null;
  }

  async getLeaderboard(clusterId, limit = 10) {
    let text = `
      SELECT u.id, u.name, u.xp_points, u.user_level, u.avatar_url,
        COALESCE(SUM(hs.claimed_weight_kg), 0) AS total_harvest_kg
      FROM users u
      LEFT JOIN harvest_submissions hs ON hs.user_id = u.id AND hs.status IN ('CONFIRMED', 'SETTLED', 'DELIVERED')
    `;
    const params = [];
    if (clusterId) {
      text += ' WHERE u.cluster_id = $1';
      params.push(clusterId);
    }
    text += ' GROUP BY u.id ORDER BY u.xp_points DESC LIMIT $' + (params.length + 1);
    params.push(limit);

    const result = await query(text, params);
    return result.rows;
  }
}

module.exports = new MissionRepository();
