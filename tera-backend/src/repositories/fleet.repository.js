/**
 * Fleet Repository
 * Encapsulates all direct PostgreSQL queries for the `fleet_manifests` table
 */
const { query } = require('../config/db.config');

class FleetRepository {
  async findById(id) {
    const text = `
      SELECT fm.*, u.name AS distributor_name, c.rw_number, c.village_name
      FROM fleet_manifests fm
      LEFT JOIN users u ON u.id = fm.distributor_id
      LEFT JOIN clusters c ON c.id = fm.cluster_id
      WHERE fm.id = $1 LIMIT 1
    `;
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }

  async findByDistributor(distributorId) {
    const text = `
      SELECT fm.*, c.rw_number, c.village_name
      FROM fleet_manifests fm
      LEFT JOIN clusters c ON c.id = fm.cluster_id
      WHERE fm.distributor_id = $1
      ORDER BY fm.pickup_time DESC
    `;
    const result = await query(text, [distributorId]);
    return result.rows;
  }

  async findByCluster(clusterId) {
    const text = `
      SELECT fm.*, u.name AS distributor_name
      FROM fleet_manifests fm
      LEFT JOIN users u ON u.id = fm.distributor_id
      WHERE fm.cluster_id = $1
      ORDER BY fm.pickup_time DESC
    `;
    const result = await query(text, [clusterId]);
    return result.rows;
  }

  async create({ distributor_id, cluster_id, vehicle_plate, driver_name, driver_phone, pickup_time }) {
    const text = `
      INSERT INTO fleet_manifests
        (distributor_id, cluster_id, vehicle_plate, driver_name, driver_phone, pickup_time)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await query(text, [
      distributor_id, cluster_id, vehicle_plate, driver_name, driver_phone, pickup_time,
    ]);
    return result.rows[0];
  }

  async updateStatus(id, status) {
    const text = 'UPDATE fleet_manifests SET status = $2 WHERE id = $1 RETURNING *';
    const result = await query(text, [id, status]);
    return result.rows[0] || null;
  }

  async addManifestItem(manifestId, harvestSubmissionId, loadedWeightKg) {
    const text = `
      INSERT INTO fleet_manifest_items (manifest_id, harvest_submission_id, loaded_weight_kg, loaded_at)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (manifest_id, harvest_submission_id) DO NOTHING
      RETURNING *
    `;
    const result = await query(text, [manifestId, harvestSubmissionId, loadedWeightKg]);
    return result.rows[0] || null;
  }

  async getManifestItems(manifestId) {
    const text = `
      SELECT fmi.*, hs.crop_name, hs.claimed_weight_kg, u.name AS farmer_name
      FROM fleet_manifest_items fmi
      JOIN harvest_submissions hs ON hs.id = fmi.harvest_submission_id
      LEFT JOIN users u ON u.id = hs.user_id
      WHERE fmi.manifest_id = $1
      ORDER BY fmi.loaded_at ASC
    `;
    const result = await query(text, [manifestId]);
    return result.rows;
  }
}

module.exports = new FleetRepository();
