const tasksRepo = require('./task.DB.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);

const create = (boardId, task) => tasksRepo.create(boardId, task);

const update = (boardId, taskId, task) =>
  tasksRepo.update(boardId, taskId, task);

const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
