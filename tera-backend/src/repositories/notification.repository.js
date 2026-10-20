/**
 * Notification Repository
 * Encapsulates all direct PostgreSQL queries for the `notifications` table
 */
const { query } = require('../config/db.config');

class NotificationRepository {
  async findByUserId(userId, limit = 20) {
    const text = 'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2';
    const result = await query(text, [userId, limit]);
    return result.rows;
  }

  async countUnread(userId) {
    const text = 'SELECT COUNT(*) AS count FROM notifications WHERE user_id = $1 AND is_read = false';
    const result = await query(text, [userId]);
    return parseInt(result.rows[0].count, 10);
  }

  async create({ user_id, type, title, message, reference_id }) {
    const text = `
      INSERT INTO notifications (user_id, type, title, message, reference_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await query(text, [user_id, type || 'SYSTEM', title, message, reference_id]);
    return result.rows[0];
  }

  async markAsRead(id, userId) {
    const text = 'UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2 RETURNING *';
    const result = await query(text, [id, userId]);
    return result.rows[0] || null;
  }

  async markAllAsRead(userId) {
    const text = 'UPDATE notifications SET is_read = true WHERE user_id = $1 AND is_read = false';
    await query(text, [userId]);
  }
}

module.exports = new NotificationRepository();
