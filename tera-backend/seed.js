// tera-backend/seed.js
require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashRahasia = await bcrypt.hash('rahasia123', salt);
    const hashAdmin = await bcrypt.hash('12345678', salt);

    // 1. Admin tester
    const adminCheck = await pool.query('SELECT * FROM users WHERE email = $1', ['admin@gmail.com']);
    if (adminCheck.rows.length === 0) {
      await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
        ['Admin TerasTani', 'admin@gmail.com', hashAdmin, 'user']
      );
      console.log('✓ Akun admin@gmail.com berhasil dibuat.');
    } else {
      console.log('ℹ Akun admin@gmail.com sudah ada.');
    }

    // 2. Warga Kultivator tester
    const wargaCheck = await pool.query('SELECT * FROM users WHERE email = $1', ['warga.rawasari@terastani.id']);
    if (wargaCheck.rows.length === 0) {
      await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
        ['Warga Kultivator Rawasari', 'warga.rawasari@terastani.id', hashRahasia, 'user']
      );
      console.log('✓ Akun warga.rawasari@terastani.id berhasil dibuat.');
    } else {
      await pool.query(
        'UPDATE users SET password = $1, role = $2 WHERE email = $3',
        [hashRahasia, 'user', 'warga.rawasari@terastani.id']
      );
      console.log('✓ Akun warga.rawasari@terastani.id diperbarui.');
    }

    // 3. Mitra Distributor tester
    const distCheck = await pool.query('SELECT * FROM users WHERE email = $1', ['distributor@segarlogistik.co.id']);
    if (distCheck.rows.length === 0) {
      await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
        ['Mitra Distributor Segar', 'distributor@segarlogistik.co.id', hashRahasia, 'distributor']
      );
      console.log('✓ Akun distributor@segarlogistik.co.id berhasil dibuat.');
    } else {
      await pool.query(
        'UPDATE users SET password = $1, role = $2 WHERE email = $3',
        [hashRahasia, 'distributor', 'distributor@segarlogistik.co.id']
      );
      console.log('✓ Akun distributor@segarlogistik.co.id diperbarui.');
    }

    const res = await pool.query('SELECT id, name, email, role FROM users ORDER BY id ASC');
    console.log('\nDaftar Akun di Database:');
    console.table(res.rows);
  } catch (err) {
    console.error('Error saat seeding database:', err.message);
  } finally {
    await pool.end();
  }
}

seed();
