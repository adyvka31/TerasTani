/**
 * Centralized Global Error Handler Middleware
 * Normalizes uncaught and operational errors into standard JSON responses
 */
const { HTTP_STATUS, ERROR_CODES } = require('../config/constants');
const env = require('../config/env.config');
const ApiError = require('../utils/api-error');

function errorHandler(err, req, res, next) {
  let error = err;

  // Convert generic Error to ApiError if unexpected
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Terjadi kesalahan pada server internal.';
    error = new ApiError(statusCode, message, ERROR_CODES.INTERNAL_ERROR, err.errors || []);
  }

  const response = {
    success: false,
    statusCode: error.statusCode,
    errorCode: error.errorCode,
    message: error.message,
    errors: error.errors && error.errors.length > 0 ? error.errors : undefined,
    timestamp: new Date().toISOString(),
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (error.statusCode >= 500) {
    console.error(`💥 [UNHANDLED ERROR] ${req.method} ${req.originalUrl}:`, err);
  }

  res.status(error.statusCode).json(response);
}

module.exports = errorHandler;
