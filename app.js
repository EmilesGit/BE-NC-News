const express = require("express");
const app = express();
const { getTopics, getUsers } = require("./controllers/app.controller");

app.get("/api/topics", getTopics);

app.get("/api/users", getUsers);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
  console.log(err, "<<<< Error");
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
