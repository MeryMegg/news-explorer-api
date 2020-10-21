const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const { JWT_SECRET } = require('../config');
const { errMessage } = require('../err-message');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(errMessage)
  console.log('пришел запрос', errMessage.needLogin)
  if (!token) {
    throw new AuthError(errMessage.needLogin);
  }
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError(errMessage.needLogin);
  }
  req.user = payload;

  return next();
};
