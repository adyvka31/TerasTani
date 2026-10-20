/**
 * Authentication Service
 * Implements business logic: bcrypt hashing, password verification, JWT generation
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env.config');
const userRepository = require('../repositories/user.repository');
const ApiError = require('../utils/api-error');

class AuthService {
  /**
   * Register a new user
   * @param {object} param0
   * @returns {Promise<object>}
   */
  async register({ name, email, password, role }) {
    // 1. Check if email already registered
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw ApiError.conflict('Email sudah terdaftar dalam sistem TerasTani!');
    }

    // 2. Hash password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Persist new user in database
    const newUser = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    return {
      user: newUser,
    };
  }

  /**
   * Authenticate user credentials and sign JWT
   * @param {object} param0
   * @returns {Promise<object>}
   */
  async login({ email, password }) {
    // 1. Find user by email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw ApiError.badRequest('Email atau kata sandi tidak cocok dengan arsip kami. Silakan periksa kembali.');
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw ApiError.badRequest('Email atau kata sandi tidak cocok dengan arsip kami. Silakan periksa kembali.');
    }

    // 3. Issue JWT Bearer token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * Retrieve current authenticated user profile
   * @param {number|string} userId
   * @returns {Promise<object>}
   */
  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('Profil pengguna tidak ditemukan.');
    }
    return user;
  }
}

module.exports = new AuthService();
