const {
  getArticle,
  getArticleId,
  getComments,
  updateArticle,
  newComment,
} = require("../controllers/app.controller");

const articleRouter = require("express").Router();

articleRouter.get("/", getArticle);

articleRouter.get("/:article_id", getArticleId);

articleRouter.get("/:article_id/comments", getComments);

articleRouter.patch("/:article_id", updateArticle);

articleRouter.post("/:article_id/comments", newComment);

module.exports = articleRouter;
