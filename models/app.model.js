const db = require("../db/connection");
const format = require("pg-format");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then((res) => {
    return res.rows;
  });
};

exports.selectUser = () => {
  return db.query("SELECT * FROM users").then((res) => {
    return res.rows;
  });
};
