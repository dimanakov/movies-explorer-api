const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONFLICT_409 = require('../errors/CONFLICT_409');
const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  // преобразуем пароль в hash
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      // извлекаем введённые данные из body
      const {
        email, name,
      } = req.body;
      return User.create(
        {
          // записываем хеш вместо пароля в базу
          email, password: hash, name,
        },
      )
        .then((user) => {
          // успешная регистрация. Возращаем данные пользователя: имя, почта, Id
          res.status(201).send({
            data: {
              name: user.name,
              email: user.email,
              _id: user._id,
            },
          });
        });
    })
    .catch((err) => {
      // если введённая почта уже используется, то БД выдаст ошибку с кодом 11000
      if (err.code === 11000) {
        // сообщаем пользователю ошибку
        next(new CONFLICT_409('введённый email уже используется'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  // деструктурируем данные из тела запроса
  const { email, password } = req.body;

  // проверяем наличие почты и соответствие пароля с помощью встроенного метода БД
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        // создаем jwt токен на 7 дней и отправляем пользователю
        token: jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-keypas',
          { expiresIn: '7d' },
        ),
      });
    })
    .catch(next);
};
