/**
 * Harvest Repository
 * Encapsulates all direct PostgreSQL queries for the `harvest_submissions` table
 */
const { query } = require('../config/db.config');

class HarvestRepository {
  async findById(id) {
    const text = `
      SELECT hs.*, u.name AS user_name, c.rw_number, c.village_name
      FROM harvest_submissions hs
      LEFT JOIN users u ON u.id = hs.user_id
      LEFT JOIN clusters c ON c.id = hs.cluster_id
      WHERE hs.id = $1 LIMIT 1
    `;
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }

  async findByUserId(userId, limit = 20, offset = 0) {
    const text = `
      SELECT hs.*, c.rw_number, c.village_name
      FROM harvest_submissions hs
      LEFT JOIN clusters c ON c.id = hs.cluster_id
      WHERE hs.user_id = $1
      ORDER BY hs.created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await query(text, [userId, limit, offset]);
    return result.rows;
  }

  async findByClusterId(clusterId, status) {
    let text = 'SELECT * FROM harvest_submissions WHERE cluster_id = $1';
    const params = [clusterId];
    if (status) {
      text += ' AND status = $2';
      params.push(status);
    }
    text += ' ORDER BY created_at DESC';
    const result = await query(text, params);
    return result.rows;
  }

  async findByQrCode(qrCode) {
    const text = 'SELECT * FROM harvest_submissions WHERE qr_ticket_code = $1 LIMIT 1';
    const result = await query(text, [qrCode]);
    return result.rows[0] || null;
  }

  async create({ user_id, cluster_id, quota_id, crop_name, claimed_weight_kg, photo_url, qr_ticket_code }) {
    const text = `
      INSERT INTO harvest_submissions
        (user_id, cluster_id, quota_id, crop_name, claimed_weight_kg, photo_url, qr_ticket_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const result = await query(text, [
      user_id, cluster_id, quota_id, crop_name, claimed_weight_kg, photo_url, qr_ticket_code,
    ]);
    return result.rows[0];
  }

  async updateAIValidation(id, { ai_validated_weight_kg, ai_quality_grade, ai_confidence_score, ai_analysis_notes }) {
    const text = `
      UPDATE harvest_submissions
      SET ai_validated_weight_kg = $2,
          ai_quality_grade = $3,
          ai_confidence_score = $4,
          ai_analysis_notes = $5,
          status = 'HOME_VALIDATED'
      WHERE id = $1
      RETURNING *
    `;
    const result = await query(text, [id, ai_validated_weight_kg, ai_quality_grade, ai_confidence_score, ai_analysis_notes]);
    return result.rows[0] || null;
  }

  async updatePhysicalCheck(id, { physical_checked_weight, physical_checked_by }) {
    const text = `
      UPDATE harvest_submissions
      SET physical_checked_weight = $2,
          physical_checked_by = $3,
          physical_checked_at = NOW(),
          status = 'PHYSICAL_CHECKED'
      WHERE id = $1
      RETURNING *
    `;
    const result = await query(text, [id, physical_checked_weight, physical_checked_by]);
    return result.rows[0] || null;
  }

  async updateStatus(id, status, extras = {}) {
    const setClauses = ['status = $2'];
    const params = [id, status];
    let paramIndex = 3;

    if (extras.confirmed_by_admin) {
      setClauses.push(`confirmed_by_admin = $${paramIndex}`, `confirmed_at = NOW()`);
      params.push(extras.confirmed_by_admin);
      paramIndex++;
    }
    if (extras.payout_amount !== undefined) {
      setClauses.push(`payout_amount = $${paramIndex}`);
      params.push(extras.payout_amount);
      paramIndex++;
    }
    if (extras.rejection_reason) {
      setClauses.push(`rejection_reason = $${paramIndex}`);
      params.push(extras.rejection_reason);
      paramIndex++;
    }

    const text = `UPDATE harvest_submissions SET ${setClauses.join(', ')} WHERE id = $1 RETURNING *`;
    const result = await query(text, params);
    return result.rows[0] || null;
  }

  async getClusterSummary(clusterId) {
    const text = `
      SELECT
        COUNT(*) AS total_submissions,
        COALESCE(SUM(claimed_weight_kg), 0) AS total_claimed_kg,
        COALESCE(SUM(CASE WHEN status IN ('CONFIRMED', 'SETTLED', 'DELIVERED') THEN claimed_weight_kg ELSE 0 END), 0) AS confirmed_kg,
        COALESCE(SUM(payout_amount), 0) AS total_payout
      FROM harvest_submissions
      WHERE cluster_id = $1
    `;
    const result = await query(text, [clusterId]);
    return result.rows[0];
  }
}

module.exports = new HarvestRepository();
