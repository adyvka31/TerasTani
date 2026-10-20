/**
 * Health Check & System Diagnostics Controller
 */
const { testConnection } = require('../config/db.config');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class HealthController {
  getHealth = asyncHandler(async (req, res) => {
    const isDbConnected = await testConnection();

    const diagnostics = {
      status: isDbConnected ? 'HEALTHY' : 'DEGRADED',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      services: {
        database: isDbConnected ? 'UP' : 'DOWN',
        api: 'UP',
      },
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    };

    const statusCode = isDbConnected ? 200 : 503;
    return ApiResponse.success(res, 'Sistem TerasTani Berjalan Normal', diagnostics, statusCode);
  });
}

module.exports = new HealthController();
