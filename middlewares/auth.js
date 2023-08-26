const { JWT_SECRET, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const UNAUTHORIZED_401 = require('../errors/UNAUTHORIZED_401');

module.exports = (req, res, next) => {
  // тут будет вся авторизация
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // при отсутствии токена вернём ошибку 401
    next(new UNAUTHORIZED_401('Необходима авторизация'));
    return;
  }
  // обрабатываем токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // пытаемся верифицировать токен в блоке try
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-keypas',
    );
  } catch (err) {
    // при неудаче верификации вернём ошибку 401
    next(new UNAUTHORIZED_401('Необходима авторизация'));
  }
  req.user = payload; // записываем верификацию в объект запроса
  next(); // пропускаем запрос дальше
};
