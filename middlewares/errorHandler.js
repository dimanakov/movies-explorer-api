module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message, name } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка.'
        : message,
      name,
      statusCode,
    });
  next();
};
