const db = require("../db/connection");
const format = require("pg-format");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then((res) => {
    return res.rows;
  });
};

exports.selectArticle = (article_id) => {
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
