/**
 * Quota Repository
 * Encapsulates all direct PostgreSQL queries for the `distributor_quotas` table
 */
const { query } = require('../config/db.config');

class QuotaRepository {
  async findById(id) {
    const text = `
      SELECT dq.*, u.name AS distributor_name, c.rw_number, c.village_name
      FROM distributor_quotas dq
      LEFT JOIN users u ON u.id = dq.distributor_id
      LEFT JOIN clusters c ON c.id = dq.cluster_id
      WHERE dq.id = $1 LIMIT 1
    `;
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }

  async findByDistributor(distributorId) {
    const text = `
      SELECT dq.*, c.rw_number, c.village_name
      FROM distributor_quotas dq
      LEFT JOIN clusters c ON c.id = dq.cluster_id
      WHERE dq.distributor_id = $1
      ORDER BY dq.created_at DESC
    `;
    const result = await query(text, [distributorId]);
    return result.rows;
  }

  async findOpenByCluster(clusterId) {
    const text = `
      SELECT dq.*, u.name AS distributor_name
      FROM distributor_quotas dq
      LEFT JOIN users u ON u.id = dq.distributor_id
      WHERE dq.cluster_id = $1 AND dq.status IN ('OPEN', 'PARTIALLY_FILLED', 'IN_PROGRESS')
      ORDER BY dq.end_date ASC
    `;
    const result = await query(text, [clusterId]);
    return result.rows;
  }

  async findAllOpen() {
    const text = `
      SELECT dq.*, u.name AS distributor_name, c.rw_number, c.village_name
      FROM distributor_quotas dq
      LEFT JOIN users u ON u.id = dq.distributor_id
      LEFT JOIN clusters c ON c.id = dq.cluster_id
      WHERE dq.status IN ('OPEN', 'PARTIALLY_FILLED', 'IN_PROGRESS')
      ORDER BY dq.end_date ASC
    `;
    const result = await query(text);
    return result.rows;
  }

  async create({ distributor_id, cluster_id, crop_name, target_weight_kg, price_per_kg, start_date, end_date }) {
    const text = `
      INSERT INTO distributor_quotas
        (distributor_id, cluster_id, crop_name, target_weight_kg, price_per_kg, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const result = await query(text, [
      distributor_id, cluster_id, crop_name, target_weight_kg, price_per_kg, start_date, end_date,
    ]);
    return result.rows[0];
  }

  async addWeight(id, additionalKg) {
    const text = `
      UPDATE distributor_quotas
      SET collected_weight_kg = collected_weight_kg + $2,
          status = CASE
            WHEN collected_weight_kg + $2 >= target_weight_kg THEN 'FILLED'::quota_status
            ELSE 'PARTIALLY_FILLED'::quota_status
          END
      WHERE id = $1
      RETURNING *
    `;
    const result = await query(text, [id, additionalKg]);
    return result.rows[0] || null;
  }

  async updateStatus(id, status) {
    const text = 'UPDATE distributor_quotas SET status = $2 WHERE id = $1 RETURNING *';
    const result = await query(text, [id, status]);
    return result.rows[0] || null;
  }
}

module.exports = new QuotaRepository();
