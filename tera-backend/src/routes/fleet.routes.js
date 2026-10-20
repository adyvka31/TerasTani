/**
 * Fleet Routes
 */
const express = require('express');
const fleetController = require('../controllers/fleet.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/my', authorizeRoles('distributor', 'admin'), fleetController.getMyFleets);
router.get('/cluster/:clusterId', fleetController.getByCluster);
router.get('/:id', fleetController.getDetails);

router.post('/', authorizeRoles('distributor', 'admin'), fleetController.create);
router.patch('/:id/status', authorizeRoles('distributor', 'admin'), fleetController.updateStatus);
router.post('/:id/items', authorizeRoles('distributor', 'admin'), fleetController.loadItem);

module.exports = router;
