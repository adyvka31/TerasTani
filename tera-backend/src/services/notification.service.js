/**
 * Notification Service
 */
const notificationRepo = require('../repositories/notification.repository');

class NotificationService {
  async getUserNotifications(userId, limit = 20) {
    const list = await notificationRepo.findByUserId(userId, limit);
    const unreadCount = await notificationRepo.countUnread(userId);
    return { list, unreadCount };
  }

  async markAsRead(id, userId) {
    return notificationRepo.markAsRead(id, userId);
  }

  async markAllAsRead(userId) {
    return notificationRepo.markAllAsRead(userId);
  }
}

module.exports = new NotificationService();
