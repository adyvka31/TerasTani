/**
 * Crop Routes
 */
const express = require('express');
const cropController = require('../controllers/crop.controller');

const router = express.Router();

router.get('/', cropController.getAll);
router.get('/:slug', cropController.getBySlug);

module.exports = router;
