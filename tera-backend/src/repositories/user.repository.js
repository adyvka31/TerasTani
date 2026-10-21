/**
 * User Repository
 * Encapsulates all direct PostgreSQL queries for the `users` table
 */
const { query } = require('../config/db.config');

class UserRepository {
  /**
   * Find a user record by email
   * @param {string} email
   * @returns {Promise<object|null>}
   */
  async findByEmail(email) {
    const text = 'SELECT id, name, email, password, role, xp_points, user_level, wallet_balance, cluster_id, avatar_url FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1';
    const result = await query(text, [email]);
    return result.rows[0] || null;
  }

  /**
   * Find a user record by ID (excludes password by default)
   * @param {number|string} id
   * @returns {Promise<object|null>}
   */
  async findById(id) {
    const text = 'SELECT id, name, email, role, xp_points, user_level, wallet_balance, cluster_id, avatar_url, created_at FROM users WHERE id = $1 LIMIT 1';
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }

  /**
   * Create a new user record
   * @param {object} userData
   * @param {string} userData.name
   * @param {string} userData.email
   * @param {string} userData.password
   * @param {string} userData.role
   * @returns {Promise<object>}
   */
  async create({ name, email, password, role = 'user' }) {
    const text = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role
    `;
    const result = await query(text, [name, email, password, role]);
    return result.rows[0];
  }

  /**
   * Retrieve all users (for administrative/diagnostic purposes)
   * @returns {Promise<Array>}
   */
  async listAll() {
    const text = 'SELECT id, name, email, role FROM users ORDER BY id ASC';
    const result = await query(text);
    return result.rows;
  }
}

module.exports = new UserRepository();
