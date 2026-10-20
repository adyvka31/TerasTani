/**
 * Wallet & Escrow Settlement Service
 */
const walletRepo = require('../repositories/wallet.repository');
const notificationRepo = require('../repositories/notification.repository');
const ApiError = require('../utils/api-error');

class WalletService {
  async getWalletDetails(userId) {
    const balance = await walletRepo.getUserBalance(userId);
    const summary = await walletRepo.getSummary(userId);
    const transactions = await walletRepo.findByUserId(userId, 20);

    return {
      balance,
      pendingEscrow: parseFloat(summary.pending_escrow || 0),
      totalWithdrawn: parseFloat(summary.total_withdrawn || 0),
      totalEarned: parseFloat(summary.total_earned || 0),
      transactions,
    };
  }

  async getTransactions(userId, limit = 20, offset = 0) {
    return walletRepo.findByUserId(userId, limit, offset);
  }

  async requestWithdrawal(userId, { amount, payment_method, notes }) {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      throw ApiError.badRequest('Nominal penarikan tidak valid.');
    }

    try {
      const transaction = await walletRepo.processWithdrawal(
        userId,
        numAmount,
        payment_method || 'BCA',
        notes || 'Penarikan dana escrow hasil panen'
      );

      // Notification
      await notificationRepo.create({
        user_id: userId,
        type: 'WALLET',
        title: 'Penarikan Dana Berhasil Diproses',
        message: `Penarikan sebesar Rp ${numAmount.toLocaleString('id-ID')} ke ${payment_method || 'rekening'} telah selesai.`,
        reference_id: transaction.id,
      });

      return transaction;
    } catch (err) {
      if (err.message === 'INSUFFICIENT_BALANCE') {
        throw ApiError.badRequest('Saldo dompet tidak mencukupi untuk melakukan penarikan ini.');
      }
      throw err;
    }
  }
}

module.exports = new WalletService();
