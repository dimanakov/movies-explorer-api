const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  signupValidator,
  signinValidator,
} = require('../middlewares/requestValidator');
const { createUser, login } = require('../controllers/auth');
const NOT_FOUND_404 = require('../errors/NOT_FOUND_404');

router.post('/signup', signupValidator, createUser);
router.post('/signin', signinValidator, login);

// все роуты, кроме /signin и / signup защищены авторизацией
router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => { // обработчик несуществующих страниц
  next(new NOT_FOUND_404('Запрашиваемая страница не найдена.'));
});

module.exports = router;
