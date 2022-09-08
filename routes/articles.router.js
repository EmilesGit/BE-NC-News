const {
  getArticle,
  getArticleId,
  getComments,
  updateArticle,
} = require("../controllers/app.controller");

const articleRouter = require("express").Router();

articleRouter.get("/", getArticle);

articleRouter.get("/:article_id", getArticleId);

articleRouter.get("/:article_id/comments", getComments);

articleRouter.patch("/:article_id", updateArticle);

module.exports = articleRouter;
