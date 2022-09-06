const express = require("express");
const app = express();
const {
  getTopics,
  getArticle,
  updateArticle,
} = require("./controllers/app.controller");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

app.patch("/api/articles/:article_id", updateArticle);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
