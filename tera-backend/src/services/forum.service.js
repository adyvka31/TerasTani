/**
 * Forum & Community Service
 */
const forumRepo = require('../repositories/forum.repository');
const ApiError = require('../utils/api-error');

class ForumService {
  async getPosts(clusterId, limit = 20, offset = 0) {
    return forumRepo.findAllPosts(clusterId, limit, offset);
  }

  async getPostDetails(id) {
    const post = await forumRepo.findPostById(id);
    if (!post) throw ApiError.notFound('Postingan tidak ditemukan.');
    const comments = await forumRepo.getComments(id);
    return { ...post, comments };
  }

  async createPost(userId, { cluster_id, title, content, image_url }) {
    if (!title || !content) {
      throw ApiError.badRequest('Judul dan isi postingan wajib diisi.');
    }
    return forumRepo.createPost({
      user_id: userId,
      cluster_id: cluster_id || null,
      title,
      content,
      image_url: image_url || null,
    });
  }

  async deletePost(id, userId) {
    const deleted = await forumRepo.deletePost(id, userId);
    if (!deleted) throw ApiError.notFound('Postingan tidak ditemukan atau bukan milik Anda.');
    return deleted;
  }

  async addComment(postId, userId, { content }) {
    if (!content) throw ApiError.badRequest('Isi komentar tidak boleh kosong.');
    return forumRepo.createComment({ post_id: postId, user_id: userId, content });
  }
}

module.exports = new ForumService();
