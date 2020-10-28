const { User } = require('./user.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const taskRepository = require('../tasks/task.DB.repository');

const getAll = async () => {
  return User.find({});
};

const get = async id => {
  const user = await User.findById(id);

  if (!user) {
    throw new NOT_FOUND_ERROR(`The user with id: ${id} is undefined`);
  }

  return user;
};

const create = async user => {
  return User.create(user);
};

const update = async (id, user) => {
  const matchUser = await User.findById(id);
  if (!matchUser) {
    throw new NOT_FOUND_ERROR(`The user with id: ${id} is undefined.`);
  }

  await User.updateOne({ _id: id }, user);
  return get(id);
};

const remove = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NOT_FOUND_ERROR(`The user with id: ${id} is undefined.`);
  }
  taskRepository.userNull(id);
  return User.findByIdAndDelete(id);
};

module.exports = { getAll, get, create, update, remove };
