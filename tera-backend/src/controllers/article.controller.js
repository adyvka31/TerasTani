/**
 * Article Controller
 */
const articleService = require('../services/article.service');
const ApiResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-handler');

class ArticleController {
  getArticles = asyncHandler(async (req, res) => {
    const category = req.query.category || null;
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = parseInt(req.query.offset, 10) || 0;
    const articles = await articleService.getArticles(category, limit, offset);
    return ApiResponse.success(res, 'Daftar artikel edukasi berhasil dimuat', articles);
  });

  getBySlug = asyncHandler(async (req, res) => {
    const article = await articleService.getArticleBySlug(req.params.slug);
    return ApiResponse.success(res, 'Artikel berhasil dimuat', article);
  });

  create = asyncHandler(async (req, res) => {
    const article = await articleService.createArticle(req.user.id, req.body);
    return ApiResponse.created(res, 'Artikel berhasil diterbitkan', article);
  });
}

module.exports = new ArticleController();
