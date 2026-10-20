/**
 * Forum Controller
 */
const forumService = require('../services/forum.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class ForumController {
  getPosts = asyncHandler(async (req, res) => {
    const clusterId = req.query.clusterId || null;
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = parseInt(req.query.offset, 10) || 0;
    const posts = await forumService.getPosts(clusterId, limit, offset);
    return ApiResponse.success(res, 'Daftar forum berhasil dimuat', posts);
  });

  getPostDetails = asyncHandler(async (req, res) => {
    const post = await forumService.getPostDetails(req.params.id);
    return ApiResponse.success(res, 'Detail forum berhasil dimuat', post);
  });

  createPost = asyncHandler(async (req, res) => {
    const post = await forumService.createPost(req.user.id, req.body);
    return ApiResponse.created(res, 'Postingan berhasil dibuat', post);
  });

  deletePost = asyncHandler(async (req, res) => {
    await forumService.deletePost(req.params.id, req.user.id);
    return ApiResponse.success(res, 'Postingan berhasil dihapus');
  });

  addComment = asyncHandler(async (req, res) => {
    const comment = await forumService.addComment(req.params.id, req.user.id, req.body);
    return ApiResponse.created(res, 'Komentar berhasil ditambahkan', comment);
  });
}

module.exports = new ForumController();
