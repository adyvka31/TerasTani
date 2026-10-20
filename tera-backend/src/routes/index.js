/**
 * Master Router Aggregator
 * Mounts standard versioned /api/v1 routes and backward-compatible root routes
 */
const express = require('express');
const authRoutes = require('./auth.routes');
const healthRoutes = require('./health.routes');
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validation.middleware');
const { validateRegister, validateLogin } = require('../validations/auth.validation');

const router = express.Router();

// --- 1. Versioned Enterprise Endpoints (/api/v1) ---
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/health', healthRoutes);

// --- 2. Backward Compatibility Endpoints (Legacy Root Routing) ---
router.post('/register', validate(validateRegister), authController.register);
router.post('/login', validate(validateLogin), authController.login);
router.use('/health', healthRoutes);

module.exports = router;
