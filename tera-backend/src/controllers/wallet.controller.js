/**
 * Wallet Controller
 */
const walletService = require('../services/wallet.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class WalletController {
  getWalletDetails = asyncHandler(async (req, res) => {
    const details = await walletService.getWalletDetails(req.user.id);
    return ApiResponse.success(res, 'Informasi dompet berhasil dimuat', details);
  });

  getTransactions = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = parseInt(req.query.offset, 10) || 0;
    const transactions = await walletService.getTransactions(req.user.id, limit, offset);
    return ApiResponse.success(res, 'Riwayat transaksi berhasil dimuat', transactions);
  });

  withdraw = asyncHandler(async (req, res) => {
    const tx = await walletService.requestWithdrawal(req.user.id, req.body);
    return ApiResponse.success(res, 'Penarikan berhasil diproses', tx);
  });
}

module.exports = new WalletController();
