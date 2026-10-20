/**
 * Database Connection Pool Configuration
 * Manages PostgreSQL connection lifecycle and diagnostic health checks
 */
const { Pool } = require('pg');
const env = require('./env.config');

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.DATABASE_URL && env.DATABASE_URL.includes('supabase.com') 
    ? { rejectUnauthorized: false } 
    : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('connect', () => {
  // Connection acquired from pool
});

pool.on('error', (err) => {
  console.error('❌ [DATABASE POOL ERROR]:', err.message);
});

/**
 * Health check ping to verify database connectivity
 * @returns {Promise<boolean>}
 */
async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    return !!result.rows[0];
  } catch (error) {
    console.error('❌ [DATABASE CONNECTION CHECK FAILED]:', error.message);
    return false;
  }
}

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  testConnection,
};
