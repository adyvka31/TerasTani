/**
 * Article & Education Service
 */
const articleRepo = require('../repositories/article.repository');
const ApiError = require('../utils/api-error');

class ArticleService {
  async getArticles(category, limit = 20, offset = 0) {
    return articleRepo.findAll(category, limit, offset);
  }

  async getArticleBySlug(slug) {
    const article = await articleRepo.findBySlug(slug);
    if (!article) throw ApiError.notFound('Artikel edukasi tidak ditemukan.');
    return article;
  }

  async createArticle(authorId, data) {
    const slug = (data.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;

    return articleRepo.create({
      author_id: authorId,
      title: data.title,
      slug,
      category: data.category,
      content: data.content,
      thumbnail_url: data.thumbnail_url,
    });
  }
}

module.exports = new ArticleService();
