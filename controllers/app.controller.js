const {
  selectTopics,
  selectArticle,
  amendArticle,
  selectUser,
  selectArticleId,
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
  const { topic } = req.query;
  selectArticle(topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleId = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleId(article_id)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch(next);
};

exports.updateArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  amendArticle(article_id, inc_votes)
    .then((updatedArticle) => {
      res.status(201).send({ updatedArticle });
    })
    .catch(next);
};

exports.getUsers = (req, res) => {
  selectUser().then((users) => {
    res.status(200).send({ users });
  });
};
