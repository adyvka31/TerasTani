/**
 * Environment Configuration
 * Validates and exposes typed environment variables
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5001,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'terastani_jwt_secret_production_key_4096',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};

if (!env.DATABASE_URL) {
  console.warn('⚠️ [WARNING] DATABASE_URL is not set in environment variables! Database operations will fail.');
}

module.exports = env;
