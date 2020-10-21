const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { errMessage } = require('../err-message');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send(article.omitPrivate()))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .orFail(new NotFoundError(errMessage.notFoundArticle))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError(errMessage.accessDenied);
      }
      Article.deleteOne(article).then(() => res.send({ data: article }));
    })
    .catch(next);
};
