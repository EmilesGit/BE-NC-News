const express = require("express");
const app = express();
const {
  getTopics,
  getArticle,
  getUsers,
  updateArticle,
  getArticleId,
} = require("./controllers/app.controller");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/errors");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticle);

app.get("/api/articles/:article_id", getArticleId);

app.patch("/api/articles/:article_id", updateArticle);

app.get("/api/users", getUsers);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
