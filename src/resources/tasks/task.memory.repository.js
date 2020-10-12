const tasksDB = require('../../common/inMemoryDb');

const getAll = async boardId => {
  return tasksDB.getAllTasksByBoardId(boardId);
  // return tasks;
};

const get = async (boardId, id) => {
  // если async, то добавляем await!!!
  const task = await tasksDB.getTasksByBoardIdAndByTaskId(boardId, id);

  if (!task) {
    throw new Error(`The task with id: ${id} is undefined`);
  }

  return task;
};

const create = async (boardId, taskBody) => {
  return tasksDB.createTask(boardId, taskBody);
};

// обновляем данные пользователя (пользователь достается по id)
const update = async (boardId, id, task) => {
  // const matchUser = await DB.updateUser(id, user);

  // if (!matchUser) {
  //   throw new Error(`The user with id: ${id} is undefined. You can't update, but you can create!`);
  // }

  return await tasksDB.updateTask(boardId, id, task);
};

const remove = async (boardId, id) => {
  return await tasksDB.removeTask(boardId, id);
};

module.exports = { getAll, get, create, update, remove };
