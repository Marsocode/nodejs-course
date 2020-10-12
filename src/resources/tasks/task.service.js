const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const create = (boardId, taskBody) => tasksRepo.create(boardId, taskBody);

const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

module.exports = { getAll, get, create, update, remove };