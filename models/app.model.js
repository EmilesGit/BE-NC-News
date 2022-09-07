const db = require("../db/connection");
const format = require("pg-format");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then((res) => {
    return res.rows;
  });
};

exports.selectArticle = (topic) => {
  let queryValues = [];
  let queryStr =
    "SELECT articles.*, COUNT (comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id";

  if (topic) {
    queryValues.push(topic);
    queryStr += ` WHERE articles.topic = $1 GROUP BY articles.article_id ORDER BY created_at DESC`;
  } else {
    queryStr += " GROUP BY articles.article_id ORDER BY created_at DESC";
  }

  {
    return db.query(queryStr, queryValues).then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({ status: 404, msg: `${topic} not found` });
      } else {
        return res.rows;
      }
    });
  }
};

exports.selectArticleId = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({ status: 404, msg: `${article_id} not found` });
      } else {
        return res.rows[0];
      }
    });
};
