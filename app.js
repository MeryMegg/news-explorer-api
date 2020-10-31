/* подключаем пакеты */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

/* импортируем модули */
const routes = require('./routes');
const {
  PORT, MONGO_URL, mongooseConfig,
} = require('./config');
const limiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/error-handler');

const whiteList = [
  'http://localhost:8080',
  'https://explorer-news.ml',
  'https://www.explorer-news.ml',
  'http://explorer-news.ml',
  'http://www.explorer-news.ml',
  'http://merymegg.github.io',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'authorization',
  ],
  credentials: true,
};

/* приложение */
const app = express();

mongoose.connect(MONGO_URL, mongooseConfig);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(routes);
app.use(errorLogger);
app.use(errorsHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
