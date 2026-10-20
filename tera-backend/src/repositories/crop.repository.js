/**
 * Crop Catalog Repository
 * Encapsulates all direct PostgreSQL queries for the `crop_catalog` table
 */
const { query } = require('../config/db.config');

class CropRepository {
  async findAll() {
    const text = 'SELECT * FROM crop_catalog WHERE is_active = true ORDER BY name ASC';
    const result = await query(text);
    return result.rows;
  }

  async findBySlug(slug) {
    const text = 'SELECT * FROM crop_catalog WHERE slug = $1 LIMIT 1';
    const result = await query(text, [slug]);
    return result.rows[0] || null;
  }
}

module.exports = new CropRepository();
