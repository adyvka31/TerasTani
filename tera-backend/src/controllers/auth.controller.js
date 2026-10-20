/**
 * Authentication Controller
 * Handles HTTP requests and delegates to AuthService
 */
const authService = require('../services/auth.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');
const { HTTP_STATUS } = require('../config/constants');

class AuthController {
  /**
   * POST /register and /api/v1/auth/register
   */
  register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    const result = await authService.register({ name, email, password, role });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      statusCode: HTTP_STATUS.CREATED,
      message: 'Registrasi berhasil',
      user: result.user,
      data: result,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * POST /login and /api/v1/auth/login
   */
  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: 'Login berhasil',
      token: result.token,
      user: result.user,
      data: result,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * GET /api/v1/auth/me
   */
  getProfile = asyncHandler(async (req, res) => {
    const user = await authService.getProfile(req.user.id);
    return ApiResponse.success(res, 'Profil berhasil diambil', user);
  });
}

module.exports = new AuthController();
