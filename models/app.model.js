const db = require("../db/connection");
const format = require("pg-format");
const { checkExists } = require("../db/seeds/utils");
const articles = require("../db/data/test-data/articles");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then((res) => {
    return res.rows;
  });
};

exports.selectArticle = (topic, sortBy = "created_at", order = "desc") => {
  let queryValues = [];
  let queryStr =
    "SELECT articles.*, COUNT (comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id";

  if (topic) {
    queryValues.push(topic);
    queryStr += ` WHERE articles.topic = $1 GROUP BY articles.article_id ORDER BY %I %s`;
  } else {
    queryStr += " GROUP BY articles.article_id ORDER BY %I %s";
  }
  const formattedQuery = format(queryStr, sortBy, order);
  console.log(formattedQuery);
  return db.query(formattedQuery, queryValues).then((res) => {
    if (res.rows.length === 0) {
      return Promise.reject({ status: 404, msg: `${topic} not found` });
    } else {
      return res.rows;
    }
  });
};

exports.selectArticleId = (article_id) => {
  return db
    .query(
      "SELECT articles.*,  COUNT (comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id",
      [article_id]
    )
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({ status: 404, msg: `${article_id} not found` });
      } else {
        return res.rows[0];
      }
    });
};

exports.amendArticle = (article_id, change) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      [change, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.selectUser = () => {
  return db.query("SELECT * FROM users").then((res) => {
    return res.rows;
  });
};

exports.selectComments = (article_id) => {
  return db
    .query(
      "SELECT DISTINCT comment_id, votes, created_at, author, body  FROM comments WHERE comments.article_id =$1",
      [article_id]
    )
    .then((res) => {
      if (res.rows.length === 0) {
        return checkExists("articles", "article_id", article_id);
      } else {
        return res.rows;
      }
    });
};

exports.addComment = (article_id, username, comment) => {
  return db
    .query(
      "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *",
      [comment, username, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};
