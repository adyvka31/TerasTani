/**
 * Article Routes
 */
const express = require('express');
const articleController = require('../controllers/article.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', articleController.getArticles);
router.get('/:slug', articleController.getBySlug);
router.post('/', authenticate, authorizeRoles('admin', 'distributor'), articleController.create);

module.exports = router;
