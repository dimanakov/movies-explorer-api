const winston = require('winston');
const expressWinston = require('express-winston');

// логгер запросов
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: './logs/request.log' }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './logs/exceptions.log' }),
  ],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: './logs/error.log' }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './logs/exceptions.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
