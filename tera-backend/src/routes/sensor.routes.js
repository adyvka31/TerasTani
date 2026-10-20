/**
 * Sensor Routes
 */
const express = require('express');
const sensorController = require('../controllers/sensor.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/cluster/:clusterId/latest', sensorController.getLatest);
router.get('/cluster/:clusterId/history', sensorController.getHistory);
router.post('/cluster/:clusterId', authenticate, sensorController.record);

module.exports = router;
