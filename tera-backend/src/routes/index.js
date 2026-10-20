/**
 * Master Router Aggregator
 * Mounts standard versioned /api/v1 routes and backward-compatible root routes
 */
const express = require('express');
const authRoutes = require('./auth.routes');
const healthRoutes = require('./health.routes');
const clusterRoutes = require('./cluster.routes');
const cropRoutes = require('./crop.routes');
const sensorRoutes = require('./sensor.routes');
const landCalcRoutes = require('./land-calculation.routes');
const harvestRoutes = require('./harvest.routes');
const quotaRoutes = require('./quota.routes');
const fleetRoutes = require('./fleet.routes');
const walletRoutes = require('./wallet.routes');
const gamificationRoutes = require('./gamification.routes');
const forumRoutes = require('./forum.routes');
const articleRoutes = require('./article.routes');
const notificationRoutes = require('./notification.routes');

const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validation.middleware');
const { validateRegister, validateLogin } = require('../validations/auth.validation');

const router = express.Router();

// --- 1. Versioned Enterprise Endpoints (/api/v1) ---
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/health', healthRoutes);
router.use('/api/v1/clusters', clusterRoutes);
router.use('/api/v1/crops', cropRoutes);
router.use('/api/v1/sensors', sensorRoutes);
router.use('/api/v1/calculator', landCalcRoutes);
router.use('/api/v1/harvests', harvestRoutes);
router.use('/api/v1/quotas', quotaRoutes);
router.use('/api/v1/fleets', fleetRoutes);
router.use('/api/v1/wallet', walletRoutes);
router.use('/api/v1/gamification', gamificationRoutes);
router.use('/api/v1/forum', forumRoutes);
router.use('/api/v1/articles', articleRoutes);
router.use('/api/v1/notifications', notificationRoutes);

// --- 2. Backward Compatibility Endpoints (Legacy Root Routing) ---
router.post('/register', validate(validateRegister), authController.register);
router.post('/login', validate(validateLogin), authController.login);
router.use('/health', healthRoutes);

module.exports = router;
