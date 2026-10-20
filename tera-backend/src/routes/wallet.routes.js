/**
 * Wallet Routes
 */
const express = require('express');
const walletController = require('../controllers/wallet.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', walletController.getWalletDetails);
router.get('/transactions', walletController.getTransactions);
router.post('/withdraw', walletController.withdraw);

module.exports = router;
