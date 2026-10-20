/**
 * Cluster Routes
 */
const express = require('express');
const clusterController = require('../controllers/cluster.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', clusterController.getAll);
router.get('/:id', clusterController.getById);
router.get('/:id/stats', clusterController.getStats);
router.post('/', authenticate, authorizeRoles('admin'), clusterController.create);

module.exports = router;
