const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Ключевое слово обязательное для заполнения'],
  },
  title: {
    type: String,
    required: [true, 'Заголовок статьи - обязательное для заполнения поле'],
  },
  text: {
    type: String,
    required: [true, 'Текст статьи - обязательное для заполнения поле'],
  },
  date: {
    type: String,
    required: [true, 'Дата - обязательное для заполнения поле'],
  },
  source: {
    type: String,
    required: [true, 'Источник статьи - обязательное для заполнения поле'],
  },
  link: {
    type: String,
    required: [true, 'Заголовок статьи - обязательное для заполнения поле'],
    validate: {
      validator: (link) => validator.isEmail(link),
      message: `Поле "link" должно содержать корректный url адрес`,
    },
  },
  image: {
    type: String,
    required: [true, 'Заголовок статьи - обязательное для заполнения поле'],
    validate: {
      validator: (url) => validator.isEmail(url),
      message: `Поле "image" должно содержать корректный url адрес`,
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" не может быть пустым'],
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);