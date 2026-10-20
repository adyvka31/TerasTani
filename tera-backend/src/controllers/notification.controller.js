/**
 * Notification Controller
 */
const notificationService = require('../services/notification.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class NotificationController {
  getMyNotifications = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 20;
    const data = await notificationService.getUserNotifications(req.user.id, limit);
    return ApiResponse.success(res, 'Notifikasi berhasil dimuat', data);
  });

  markAsRead = asyncHandler(async (req, res) => {
    const item = await notificationService.markAsRead(req.params.id, req.user.id);
    return ApiResponse.success(res, 'Notifikasi ditandai dibaca', item);
  });

  markAllAsRead = asyncHandler(async (req, res) => {
    await notificationService.markAllAsRead(req.user.id);
    return ApiResponse.success(res, 'Semua notifikasi ditandai dibaca');
  });
}

module.exports = new NotificationController();
