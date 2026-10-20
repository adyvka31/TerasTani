/**
 * Land Calculation Routes
 */
const express = require('express');
const landCalcController = require('../controllers/land-calculation.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/my', landCalcController.getUserCalculations);
router.get('/:id', landCalcController.getById);
router.post('/', landCalcController.create);
router.delete('/:id', landCalcController.remove);

module.exports = router;
