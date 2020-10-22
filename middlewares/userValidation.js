const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/bad-request-err');
const { errMessage } = require('../err-message');

const email = Joi.string().trim().required()
  .custom((value, helpers) => (validator.isEmail(value) ? value : helpers.error()))
  .error(() => new BadRequestError(errMessage.invalidEmail));
const password = Joi.string().trim().min(8)
  .required()
  .error(() => new BadRequestError(errMessage.invalidPassword));
const name = Joi.string().trim().min(2)
  .max(30)
  .required()
  .error(() => new BadRequestError(errMessage.invalidName));

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name, email, password,
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email, password,
  }),
});
