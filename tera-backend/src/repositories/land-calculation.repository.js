/**
 * Land Calculation Repository
 * Encapsulates all direct PostgreSQL queries for the `land_calculations` table
 */
const { query } = require('../config/db.config');

class LandCalculationRepository {
  async findByUserId(userId) {
    const text = 'SELECT * FROM land_calculations WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await query(text, [userId]);
    return result.rows;
  }

  async findById(id) {
    const text = 'SELECT * FROM land_calculations WHERE id = $1 LIMIT 1';
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }

  async create({ user_id, land_area_sqm, land_type, sunlight_hours, recommended_crop, estimated_yield_kg, estimated_revenue, planting_schedule, ai_raw_analysis }) {
    const text = `
      INSERT INTO land_calculations
        (user_id, land_area_sqm, land_type, sunlight_hours, recommended_crop, estimated_yield_kg, estimated_revenue, planting_schedule, ai_raw_analysis)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const result = await query(text, [
      user_id, land_area_sqm, land_type, sunlight_hours, recommended_crop,
      estimated_yield_kg, estimated_revenue, planting_schedule ? JSON.stringify(planting_schedule) : null,
      ai_raw_analysis,
    ]);
    return result.rows[0];
  }

  async delete(id, userId) {
    const text = 'DELETE FROM land_calculations WHERE id = $1 AND user_id = $2 RETURNING id';
    const result = await query(text, [id, userId]);
    return result.rows[0] || null;
  }
}

module.exports = new LandCalculationRepository();
