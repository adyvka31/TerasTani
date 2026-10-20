/**
 * Harvest Routes
 */
const express = require('express');
const harvestController = require('../controllers/harvest.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/my', harvestController.getMySubmissions);
router.get('/ticket/:qrCode', harvestController.getByQr);
router.get('/cluster/:clusterId/summary', harvestController.getClusterSummary);
router.get('/:id', harvestController.getById);

router.post('/submit', harvestController.createSubmission);
router.post('/analyze', harvestController.analyzePhoto);

// Administrative / Distributor checks
router.patch('/:id/physical-check', harvestController.physicalCheck);
router.patch('/:id/confirm', authorizeRoles('distributor', 'admin'), harvestController.confirmSubmission);
router.patch('/:id/reject', authorizeRoles('distributor', 'admin'), harvestController.rejectSubmission);

module.exports = router;
