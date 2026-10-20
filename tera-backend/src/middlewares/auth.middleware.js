/**
 * JWT Authentication & RBAC Middleware
 * Verifies Bearer tokens and protects endpoints based on roles
 */
const jwt = require('jsonwebtoken');
const env = require('../config/env.config');
const ApiError = require('../utils/api-error');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw ApiError.unauthorized('Token otentikasi tidak ditemukan. Harap sertakan Bearer token.');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw ApiError.unauthorized('Sesi login Anda telah berakhir. Silakan login kembali.');
    }
    throw ApiError.unauthorized('Token otentikasi tidak valid atau telah dimanipulasi.');
  }
}

/**
 * Role-Based Access Control Middleware Factory
 * @param  {...string} allowedRoles
 * @returns {Function}
 */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      throw ApiError.unauthorized();
    }
    if (!allowedRoles.includes(req.user.role)) {
      throw ApiError.forbidden(`Peran '${req.user.role}' tidak memiliki izin untuk aksi ini.`);
    }
    next();
  };
}

module.exports = {
  authenticate,
  authorizeRoles,
};
