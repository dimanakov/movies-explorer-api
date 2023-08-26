const mongoose = require('mongoose');
const validator = require('validator'); //  валидатор для данных БД
const bcrypt = require('bcryptjs');
const UNAUTHORIZED_401 = require('../errors/UNAUTHORIZED_401');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: 'String',
      minLength: [2, 'Поле name должно быть не меньше 2 символов.'],
      maxLength: [30, 'Поле name должно быть не больше 30 символов.'],
      required: true,
    },
    email: {
      type: 'String',
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: 'String',
      required: true,
      select: false, // необходимо добавить поле select
    },
  },
);

// добавим метод findUserByCredentials(собственный метод mongoose) схеме пользователя
// у него будет два параметра — почта и пароль
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new UNAUTHORIZED_401('Неправильные почта или пароль'));
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UNAUTHORIZED_401('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
