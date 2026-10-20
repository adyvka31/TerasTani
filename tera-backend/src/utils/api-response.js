/**
 * Standardized API Success Response
 * Formats JSON responses across all controllers
 */
const { HTTP_STATUS } = require('../config/constants');

class ApiResponse {
  /**
   * @param {number} statusCode
   * @param {string} message
   * @param {any} [data]
   * @param {object} [meta]
   */
  constructor(statusCode = HTTP_STATUS.OK, message = 'Success', data = null, meta = null) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.statusCode = statusCode;
    this.message = message;
    if (data !== null) this.data = data;
    if (meta !== null) this.meta = meta;
    this.timestamp = new Date().toISOString();
  }

  static success(res, message = 'Success', data = null, statusCode = HTTP_STATUS.OK, meta = null) {
    return res.status(statusCode).json(new ApiResponse(statusCode, message, data, meta));
  }

  static created(res, message = 'Created successfully', data = null) {
    return res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, message, data));
  }
}

module.exports = ApiResponse;
