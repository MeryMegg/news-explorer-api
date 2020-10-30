const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const validator = require('validator');

const BadRequestError = require('../errors/bad-request-err');
const { errMessage } = require('../err-message');

module.exports.createArticleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().trim()
      .error(() => new BadRequestError(errMessage.invalidKeyword)),
    title: Joi.string().required().trim()
      .error(() => new BadRequestError(errMessage.invalidTitle)),
    text: Joi.string().required().trim()
      .error(() => new BadRequestError(errMessage.invalidText)),
    date: Joi.string().required().trim()
      .error(() => new BadRequestError(errMessage.invalidDate)),
    source: Joi.string().required().trim()
      .error(() => new BadRequestError(errMessage.invalidSource)),
    link: Joi.string().required().trim()
      .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error()))
      .error(() => new BadRequestError(errMessage.invalidLink)),
    image: Joi.string().required().trim()
      .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error()))
      .error(() => new BadRequestError(errMessage.invalidImage)),
  }),
});

module.exports.articleIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.objectId()
      .error(() => new BadRequestError(errMessage.invalidArticleId)),
  }),
});
