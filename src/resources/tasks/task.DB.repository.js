// const tasksDB = require('../../common/inMemoryDb');
const { Task } = require('./task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');

const getAll = async boardId => {
  // console.log(boardId);
  // console.log(Task);
  return Task.find({ boardId });
};

const get = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId }).exec();
  // console.log(`>>>> ${task}`);
  if (!task) {
    throw new NOT_FOUND_ERROR(
      `The task with boardId: ${boardId} taskId: ${taskId} is undefined`
    );
  }
  return Task.findOne({ _id: taskId, boardId });
};

const create = async (boardId, taskBody) => {
  // boardId
  const { title, order, description, userId, columnId } = taskBody;
  return Task.create({ title, order, description, userId, boardId, columnId });
};

// обновляем данные пользователя (пользователь достается по id)
const update = async (id, taskId, body) => {
  const { title, order, description, userId, boardId, columnId } = body;

  return Task.findOneAndUpdate(
    { _id: taskId, boardId: id },
    { title, order, description, userId, boardId, columnId },
    { new: true }
  );
};

const remove = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId }).exec();
  if (!task) {
    throw new NOT_FOUND_ERROR(
      `The task with boardId: ${boardId} taskId: ${taskId} is undefined`
    );
  }
  return Task.deleteOne({ _id: taskId, boardId });
};

// delete board => delete all tasks in this board
const removeTasksByBoardId = async boardId => {
  return Task.deleteMany({ boardId });
};

// if user is deleted, all his tasks userId=null
const userNull = async userId => {
  return Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  removeTasksByBoardId,
  userNull
};
