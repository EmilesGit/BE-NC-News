const {
  selectTopics,
  selectArticle,
  amendArticle,
  selectUser,
  selectArticleId,
  selectComments,
  addComment,
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
  const { topic, sort_by, order } = req.query;

  selectArticle(topic, sort_by, order)
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

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;
  selectComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.newComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, comment } = req.body;
  addComment(article_id, username, comment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
