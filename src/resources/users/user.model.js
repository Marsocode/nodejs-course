// const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: String,
    login: String,
    password: String
  },
  // задаем option collection (даем ей название)
  { collection: 'users' }
);

const toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

module.exports = {
  // экспортируем имя коллекции и схему entity User
  User: mongoose.model('users', User),
  toResponse
};
