const {
  selectTopics,
  selectArticle,
  selectUser,
} = require("../models/app.model");

exports.getTopics = (req, res) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  selectArticle(article_id)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch(next);
};

exports.getUsers = (req, res) => {
  selectUser().then((users) => {
    res.status(200).send({ users });
  });
};
