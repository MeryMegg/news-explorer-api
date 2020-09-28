/* подключаем пакеты */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/* импортируем модули */
const routes = require('./routes');
const {
  PORT, MONGO_URL, mongooseConfig,
} = require('./config');
const limiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/error-handler');

/* приложение */
const app = express();

mongoose.connect(MONGO_URL, mongooseConfig);

app.use(limiter);
app.use(helmet());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errorsHandler);

app.listen(PORT);
