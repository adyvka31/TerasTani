/**
 * Article Repository
 * Encapsulates all direct PostgreSQL queries for the `articles` table
 */
const { query } = require('../config/db.config');

class ArticleRepository {
  async findAll(category, limit = 20, offset = 0) {
    let text = `
      SELECT a.*, u.name AS author_name
      FROM articles a
      LEFT JOIN users u ON u.id = a.author_id
      WHERE a.is_published = true
    `;
    const params = [];
    if (category) {
      params.push(category);
      text += ` AND a.category = $${params.length}`;
    }
    text += ` ORDER BY a.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    const result = await query(text, params);
    return result.rows;
  }

  async findBySlug(slug) {
    const text = `
      SELECT a.*, u.name AS author_name
      FROM articles a
      LEFT JOIN users u ON u.id = a.author_id
      WHERE a.slug = $1 LIMIT 1
    `;
    const result = await query(text, [slug]);
    return result.rows[0] || null;
  }

  async findById(id) {
    const text = 'SELECT * FROM articles WHERE id = $1 LIMIT 1';
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }

  async create({ author_id, title, slug, category, content, thumbnail_url }) {
    const text = `
      INSERT INTO articles (author_id, title, slug, category, content, thumbnail_url, is_published, published_at)
      VALUES ($1, $2, $3, $4, $5, $6, true, NOW())
      RETURNING *
    `;
    const result = await query(text, [author_id, title, slug, category || 'Edukasi', content, thumbnail_url]);
    return result.rows[0];
  }

  async update(id, { title, category, content, thumbnail_url }) {
    const text = `
      UPDATE articles SET title = COALESCE($2, title), category = COALESCE($3, category),
        content = COALESCE($4, content), thumbnail_url = COALESCE($5, thumbnail_url)
      WHERE id = $1 RETURNING *
    `;
    const result = await query(text, [id, title, category, content, thumbnail_url]);
    return result.rows[0] || null;
  }

  async delete(id) {
    const text = 'DELETE FROM articles WHERE id = $1 RETURNING id';
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }
}

module.exports = new ArticleRepository();
