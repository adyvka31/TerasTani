/**
 * Forum Repository
 * Encapsulates all direct PostgreSQL queries for `forum_posts` and `forum_comments` tables
 */
const { query } = require('../config/db.config');

class ForumRepository {
  async findAllPosts(clusterId, limit = 20, offset = 0) {
    let text = `
      SELECT fp.*, u.name AS author_name, u.avatar_url,
        (SELECT COUNT(*) FROM forum_comments fc WHERE fc.post_id = fp.id) AS comment_count
      FROM forum_posts fp
      LEFT JOIN users u ON u.id = fp.user_id
    `;
    const params = [];
    if (clusterId) {
      text += ' WHERE fp.cluster_id = $1';
      params.push(clusterId);
    }
    text += ` ORDER BY fp.is_pinned DESC, fp.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    const result = await query(text, params);
    return result.rows;
  }

  async findPostById(id) {
    const text = `
      SELECT fp.*, u.name AS author_name, u.avatar_url
      FROM forum_posts fp
      LEFT JOIN users u ON u.id = fp.user_id
      WHERE fp.id = $1 LIMIT 1
    `;
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }

  async createPost({ user_id, cluster_id, title, content, image_url }) {
    const text = `
      INSERT INTO forum_posts (user_id, cluster_id, title, content, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await query(text, [user_id, cluster_id, title, content, image_url]);
    return result.rows[0];
  }

  async deletePost(id, userId) {
    const text = 'DELETE FROM forum_posts WHERE id = $1 AND user_id = $2 RETURNING id';
    const result = await query(text, [id, userId]);
    return result.rows[0] || null;
  }

  async getComments(postId) {
    const text = `
      SELECT fc.*, u.name AS author_name, u.avatar_url
      FROM forum_comments fc
      LEFT JOIN users u ON u.id = fc.user_id
      WHERE fc.post_id = $1
      ORDER BY fc.created_at ASC
    `;
    const result = await query(text, [postId]);
    return result.rows;
  }

  async createComment({ post_id, user_id, content }) {
    const text = `
      INSERT INTO forum_comments (post_id, user_id, content)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await query(text, [post_id, user_id, content]);
    return result.rows[0];
  }
}

module.exports = new ForumRepository();
