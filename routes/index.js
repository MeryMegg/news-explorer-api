const router = require('express').Router();

const routerUsers = require('./users');
const routerArticles = require('./articles');
const auth = require('../middlewares/auth');
const { createUserValidation, loginValidation } = require('../middlewares/userValidation');
const { createUser, login, logout } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');
const { errMessage } = require('../err-message');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);
router.use(auth);
router.use('/signout', logout);
router.use('/users', routerUsers);
router.use('/articles', routerArticles);
router.use((req, res, next) => next(new NotFoundError(errMessage.resourceNotFound)));

module.exports = router;
