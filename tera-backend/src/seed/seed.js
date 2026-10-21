/**
 * Enterprise Database Seeder
 * Idempotently verifies and seeds default roles and tester accounts
 */
require('dotenv').config();
const { pool, testConnection } = require('../config/db.config');
const bcrypt = require('bcryptjs');

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ [SEEDER]: DATABASE_URL belum diatur di tera-backend/.env.');
    console.error('👉 Silakan buka file tera-backend/.env dan masukkan connection string database PostgreSQL/Supabase Anda.');
    process.exit(1);
  }

  console.log('🌱 [SEEDER]: Menghubungkan ke PostgreSQL...');
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('❌ [SEEDER]: Gagal terhubung ke database. Seeding dibatalkan.');
    process.exit(1);
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashRahasia = await bcrypt.hash('rahasia123', salt);
    const hashAdmin = await bcrypt.hash('12345678', salt);

    const defaultAccounts = [
      {
        name: 'Admin TerasTani',
        email: 'admin@gmail.com',
        password: hashAdmin,
        role: 'user',
      },
      {
        name: 'Warga Kultivator Rawasari',
        email: 'warga.rawasari@terastani.id',
        password: hashRahasia,
        role: 'user',
      },
      {
        name: 'Mitra Distributor Segar',
        email: 'distributor@segarlogistik.co.id',
        password: hashRahasia,
        role: 'distributor',
      },
    ];

    for (const acc of defaultAccounts) {
      const check = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [acc.email]);
      if (check.rows.length === 0) {
        await pool.query(
          'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
          [acc.name, acc.email, acc.password, acc.role]
        );
        console.log(`✓ [SEED CREATED]: ${acc.email} (${acc.role})`);
      } else {
        await pool.query(
          'UPDATE users SET name = $1, password = $2, role = $3 WHERE LOWER(email) = LOWER($4)',
          [acc.name, acc.password, acc.role, acc.email]
        );
        console.log(`ℹ [SEED UPDATED]: ${acc.email} (${acc.role})`);
      }
    }

    const res = await pool.query('SELECT id, name, email, role FROM users ORDER BY id ASC');
    console.log('\n📊 [DATABASE USERS LEDGER]:');
    console.table(res.rows);
  } catch (err) {
    console.error('❌ [SEEDER ERROR]:', err.message);
  } finally {
    await pool.end();
    console.log('✅ [SEEDER]: Selesai.');
  }
}

seed();
