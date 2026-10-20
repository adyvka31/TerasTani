/**
 * Cluster Repository
 * Encapsulates all direct PostgreSQL queries for the `clusters` table
 */
const { query } = require('../config/db.config');

class ClusterRepository {
  async findAll() {
    const text = 'SELECT * FROM clusters ORDER BY rw_number ASC';
    const result = await query(text);
    return result.rows;
  }

  async findById(id) {
    const text = 'SELECT * FROM clusters WHERE id = $1 LIMIT 1';
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }

  async findByRwNumber(rwNumber) {
    const text = 'SELECT * FROM clusters WHERE rw_number = $1 LIMIT 1';
    const result = await query(text, [rwNumber]);
    return result.rows[0] || null;
  }

  async create({ rw_number, village_name, district, address, latitude, longitude }) {
    const text = `
      INSERT INTO clusters (rw_number, village_name, district, address, latitude, longitude)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await query(text, [rw_number, village_name, district, address, latitude, longitude]);
    return result.rows[0];
  }

  async updateActiveNodes(id, count) {
    const text = 'UPDATE clusters SET active_nodes = $2 WHERE id = $1 RETURNING *';
    const result = await query(text, [id, count]);
    return result.rows[0] || null;
  }

  async getClusterStats(clusterId) {
    const text = `
      SELECT
        c.*,
        COUNT(DISTINCT u.id) AS member_count,
        COALESCE(SUM(CASE WHEN hs.status = 'SETTLED' THEN hs.payout_amount ELSE 0 END), 0) AS total_revenue
      FROM clusters c
      LEFT JOIN users u ON u.cluster_id = c.id
      LEFT JOIN harvest_submissions hs ON hs.cluster_id = c.id
      WHERE c.id = $1
      GROUP BY c.id
    `;
    const result = await query(text, [clusterId]);
    return result.rows[0] || null;
  }
}

module.exports = new ClusterRepository();
