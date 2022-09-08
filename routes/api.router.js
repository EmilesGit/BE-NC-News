const { getTopics, getUsers } = require("../controllers/app.controller");

const apiRouter = require("express").Router();
const articleRouter = require("./articles.router");

apiRouter.get("/topics", getTopics);

apiRouter.get("/users", getUsers);

apiRouter.use("/articles", articleRouter);

module.exports = apiRouter;
