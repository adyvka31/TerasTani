/**
 * Seed initial feature data: Quotas, Fleets, Sensors, and Default Users
 */
require('dotenv').config();
const { pool } = require('../config/db.config');

async function seedFeatures() {
  try {
    console.log('Seeding demo quotas, fleets, and sensors...');

    // 1. Get clusters and distributor
    const cRes = await pool.query('SELECT id, rw_number FROM clusters');
    const dRes = await pool.query("SELECT id FROM users WHERE role = 'distributor' LIMIT 1");
    const uRes = await pool.query("SELECT id FROM users WHERE role = 'user' LIMIT 1");

    const distId = dRes.rows[0]?.id || 6;
    const userId = uRes.rows[0]?.id || 5;
    const defaultClusterId = cRes.rows[0]?.id;

    // Link users to default cluster, initial balance, and XP
    if (defaultClusterId) {
      await pool.query(
        'UPDATE users SET cluster_id = $1, wallet_balance = 2450000, xp_points = 1450 WHERE id = $2',
        [defaultClusterId, userId]
      );
      console.log('User #', userId, 'updated with cluster, balance, and XP.');
    }

    // Check existing quotas
    const qCount = await pool.query('SELECT count(*) FROM distributor_quotas');
    if (parseInt(qCount.rows[0].count, 10) === 0) {
      for (const c of cRes.rows) {
        const crop = c.rw_number === 'RW07' ? 'Selada Romaine Super' : (c.rw_number === 'RW04' ? 'Pakcoy Hijau Nauli' : 'Bayam Jepang Horenso');
        const qty = c.rw_number === 'RW07' ? 480 : (c.rw_number === 'RW04' ? 650 : 320);
        const price = c.rw_number === 'RW07' ? 28500 : (c.rw_number === 'RW04' ? 24000 : 35000);

        await pool.query(
          'INSERT INTO distributor_quotas (distributor_id, cluster_id, crop_name, target_weight_kg, price_per_kg, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [distId, c.id, crop, qty, price, '2026-10-20', '2026-10-27']
        );
      }
      console.log('Distributor quotas seeded.');
    }

    // Check existing fleets
    const fCount = await pool.query('SELECT count(*) FROM fleet_manifests');
    if (parseInt(fCount.rows[0].count, 10) === 0) {
      for (const c of cRes.rows) {
        await pool.query(
          'INSERT INTO fleet_manifests (distributor_id, cluster_id, vehicle_plate, driver_name, driver_phone, pickup_time, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [distId, c.id, 'B 9481 TTA', 'Budi Santoso', '081234567890', new Date(), 'SCHEDULED']
        );
      }
      console.log('Fleet manifests seeded.');
    }

    // Check existing sensors
    const sCount = await pool.query('SELECT count(*) FROM sensor_readings');
    if (parseInt(sCount.rows[0].count, 10) === 0) {
      for (const c of cRes.rows) {
        await pool.query(
          'INSERT INTO sensor_readings (cluster_id, recorded_by, temperature_c, humidity_pct, light_wm2, uv_index, ph_value, ec_value_ms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [c.id, userId, 29.4, 65.0, 780.0, 7.2, 6.2, 1.8]
        );
      }
      console.log('Sensor readings seeded.');
    }

    console.log('Feature seeding complete!');
  } catch (err) {
    console.error('Feature seeding error:', err);
  } finally {
    await pool.end();
  }
}

seedFeatures();
