/**
 * Forum Routes
 */
const express = require('express');
const forumController = require('../controllers/forum.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', forumController.getPosts);
router.get('/:id', forumController.getPostDetails);

router.post('/', authenticate, forumController.createPost);
router.delete('/:id', authenticate, forumController.deletePost);
router.post('/:id/comments', authenticate, forumController.addComment);

module.exports = router;
