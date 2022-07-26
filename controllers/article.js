const Article = require('../models/article');
const CentralError = require('../errors/central-error');

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
        throw new CentralError(404, 'No article found with that id');
      }
      if (article.owner.valueOf() !== req.user._id) {
        throw new CentralError(403, 'Forbidden error');
      }
      return Article.findOneAndDelete({ _id: req.params.articleId });
    })
    .then((deletedArticle) => res.send({ data: deletedArticle }))
    .catch(next);
};
