/**
 * Gamification Routes
 */
const express = require('express');
const gamificationController = require('../controllers/gamification.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/missions', gamificationController.getMissions);
router.post('/missions/:missionId/claim', gamificationController.claim);
router.get('/leaderboard', gamificationController.getLeaderboard);

module.exports = router;
