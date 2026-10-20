/**
 * Custom Operational API Error
 * Standardizes operational errors across the backend architecture
 */
const { HTTP_STATUS, ERROR_CODES } = require('../config/constants');

class ApiError extends Error {
  /**
   * @param {number} statusCode
   * @param {string} message
   * @param {string} [errorCode]
   * @param {Array} [errors]
   */
  constructor(
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message = 'An unexpected server error occurred',
    errorCode = ERROR_CODES.INTERNAL_ERROR,
    errors = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, errorCode = ERROR_CODES.VALIDATION_ERROR, errors = []) {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, message, errorCode, errors);
  }

  static unauthorized(message = 'Akses tidak sah. Silakan login kembali.', errorCode = ERROR_CODES.AUTH_UNAUTHORIZED) {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, message, errorCode);
  }

  static forbidden(message = 'Anda tidak memiliki hak akses untuk tindakan ini.') {
    return new ApiError(HTTP_STATUS.FORBIDDEN, message, ERROR_CODES.AUTH_UNAUTHORIZED);
  }

  static notFound(message = 'Sumber daya yang dicari tidak ditemukan.') {
    return new ApiError(HTTP_STATUS.NOT_FOUND, message);
  }

  static conflict(message, errorCode = ERROR_CODES.AUTH_EMAIL_EXISTS) {
    return new ApiError(HTTP_STATUS.CONFLICT, message, errorCode);
  }

  static internal(message = 'Terjadi kesalahan pada server internal.') {
    return new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, message, ERROR_CODES.INTERNAL_ERROR);
  }
}

module.exports = ApiError;
