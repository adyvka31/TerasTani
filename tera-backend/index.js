// tera-backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Konfigurasi koneksi ke PostgreSQL menggunakan URL dari .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// --- ENDPOINT REGISTER ---
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    // Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user ke database
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role]
    );

    res.status(201).json({ message: 'Registrasi berhasil', user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- ENDPOINT LOGIN ---
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Email atau password salah!' });
    }

    const user = userResult.rows[0];

    // Cek kecocokan password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Email atau password salah!' });
    }

    // Buat JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      'rahasia_jwt_super_aman', // Sebaiknya simpan di .env sebagai JWT_SECRET
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login berhasil',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});