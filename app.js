require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// берём порт и адрес БД из переменных окружения .env
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL);

app.use(require('./middlewares/limiter')); // ограничитель запросов

app.use(cors({ origin: ['https://moviebag.nomoredomainsicu.ru', 'https://localhost:3001'] }));
app.use(helmet());
app.use(express.json());
// все роуты приложения
app.use(requestLogger); // логирование запросов через winston -> request.log

app.use(require('./routes/index')); // подключаем роуты приложения

app.use(errorLogger); // логирование ошибок через winston -> error.log
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок express

app.listen(PORT, () => {
  console.log(`Server work on port ${PORT}`);
});
