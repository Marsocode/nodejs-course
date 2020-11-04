const { User } = require('./user.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const taskRepository = require('../tasks/task.DB.repository');
const { hashPassword } = require('../../utils/hasHelper');

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

// const create = async user => {
//   return User.create(user);
// };

const create = async user => {
  const { name, login } = user;
  let { password } = user;

  password = await hashPassword(password);

  return User.create({ name, login, password });
};

// const update = async (id, user) => {
//   const matchUser = await User.findById(id);
//   if (!matchUser) {
//     throw new NOT_FOUND_ERROR(`The user with id: ${id} is undefined.`);
//   }

//   await User.updateOne({ _id: id }, user);
//   return get(id);
// };

const update = async (id, user) => {
  const matchUser = await User.findById(id);
  if (!matchUser) {
    throw new NOT_FOUND_ERROR(`The user with id: ${id} is undefined.`);
  }

  const { name, login } = user;
  let { password } = user;

  password = await hashPassword(password);

  return User.findByIdAndUpdate(id, { name, login, password }, { new: true });
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
