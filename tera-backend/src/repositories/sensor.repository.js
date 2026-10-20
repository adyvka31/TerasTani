/**
 * Sensor Repository
 * Encapsulates all direct PostgreSQL queries for the `sensor_readings` table
 */
const { query } = require('../config/db.config');

class SensorRepository {
  async getLatestByCluster(clusterId) {
    const text = 'SELECT * FROM sensor_readings WHERE cluster_id = $1 ORDER BY recorded_at DESC LIMIT 1';
    const result = await query(text, [clusterId]);
    return result.rows[0] || null;
  }

  async getHistory(clusterId, hours = 24) {
    const text = `
      SELECT * FROM sensor_readings
      WHERE cluster_id = $1 AND recorded_at >= NOW() - INTERVAL '1 hour' * $2
      ORDER BY recorded_at ASC
    `;
    const result = await query(text, [clusterId, hours]);
    return result.rows;
  }

  async create({ cluster_id, recorded_by, temperature_c, humidity_pct, light_wm2, uv_index, ph_value, ec_value_ms }) {
    const text = `
      INSERT INTO sensor_readings
        (cluster_id, recorded_by, temperature_c, humidity_pct, light_wm2, uv_index, ph_value, ec_value_ms)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const result = await query(text, [
      cluster_id, recorded_by, temperature_c, humidity_pct, light_wm2, uv_index, ph_value, ec_value_ms,
    ]);
    return result.rows[0];
  }
}

module.exports = new SensorRepository();
