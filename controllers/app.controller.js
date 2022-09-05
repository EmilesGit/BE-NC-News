const { selectTopics, selectArticle } = require("../models/app.model");

exports.getTopics = (req, res) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getArticle = (req, res) => {
  const { article_id } = req.params;
  selectArticle(article_id)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};
