/**
 * Auth Routes Definition
 */
const express = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validation.middleware');
const { validateRegister, validateLogin } = require('../validations/auth.validation');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', validate(validateRegister), authController.register);
router.post('/login', validate(validateLogin), authController.login);
router.get('/me', authenticate, authController.getProfile);

module.exports = router;
