const Article = require('../models/article');
const NO_ARTICLE_FOUND = require('../lib/constants');
const FORBIDDEN_ERROR = require('../lib/constants');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send(article))
    .catch(next);
};
module.exports.getArticles = (req, res, next) => {
  Article.find()
    .then((articles) => res.send(articles))
    .catch(next);
};
module.exports.deleteArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.articleId })
    .then((article) => {
      if (!article) {
        throw NO_ARTICLE_FOUND;
      }
      if (article.owner.valueOf() !== req.user._id) {
        throw FORBIDDEN_ERROR;
      }
      return Article.findOneAndDelete({ _id: req.params.articleId });
    })
    .then((deletedArticle) => res.send({ data: deletedArticle }))
    .catch(next);
};
