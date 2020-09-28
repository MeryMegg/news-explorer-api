const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const AuthError = require('../errors/auth-err');
const { duplicateKeyException, errMessage } = require('../err-message');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(errMessage.notFoundUser))
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({ data: user.omitPrivate() }))
    .catch((err) => {
      let error;
      if (err.name === 'MongoError' && err.code === duplicateKeyException.errCode) {
        error = new ConflictError(duplicateKeyException.errMessage);
        return next(error);
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).end(errMessage.successfulAuth);
    })
    .catch((err) => {
      let error;
      if (err.name === 'Error') {
        error = new AuthError(errMessage.unsuccessfulAuth);
        return next(error);
      }
      return next(err);
    });
};
