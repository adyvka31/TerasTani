/**
 * Quota Routes
 */
const express = require('express');
const quotaController = require('../controllers/quota.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/open', quotaController.getAllOpen);
router.get('/cluster/:clusterId', quotaController.getByCluster);
router.get('/my', authorizeRoles('distributor', 'admin'), quotaController.getMyQuotas);
router.get('/:id', quotaController.getById);

router.post('/', authorizeRoles('distributor', 'admin'), quotaController.create);
router.post('/:id/book', quotaController.book);

module.exports = router;
