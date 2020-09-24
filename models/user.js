const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" обязательное для заполнения'],
    minlength: [2, 'Длина имени от 2 до 30 символов'],
    maxlength: [30, 'Длина имени от 2 до 30 символов'],
  },
  email: {
    type: String,
    required: [true, 'Поле "e-mail" обязательное для заполнения'],
    unique: [true, 'Пользователь с данным e-mail уже зарегистрирован'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: `Это поле должно содержать корректный e-mail`,
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" обязательное для заполнения'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);