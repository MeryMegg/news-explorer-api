const router = require('express').Router();

const routerUsers = require('./users');
const routerArticles = require('./articles');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');
const { createUserValidation, loginValidation } = require('../middlewares/userValidation');
const errMessage = require('../err-message');

router.use('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);
router.use(auth);
router.use('/users', routerUsers);
router.use('/articles', routerArticles);
router.use((req, res, next) => next(new NotFoundError(errMessage.notFound)));

module.exports = router;
