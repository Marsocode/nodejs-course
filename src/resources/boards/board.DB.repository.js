// const boardsDB = require('../../common/inMemoryDb');
const { Board } = require('./board.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const taskRepository = require('../tasks/task.DB.repository');

const getAll = async () => {
  return Board.find({});
};

const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NOT_FOUND_ERROR(`The board with id: ${id} is undefined`);
  }
  return board;
};

const create = async board => {
  return Board.create(board);
};

const update = async (id, board) => {
  const matchBoard = await Board.findById(id);
  if (!matchBoard) {
    throw new NOT_FOUND_ERROR(`The board with id: ${id} is undefined`);
  }
  await Board.updateOne({ _id: id }, board);
  return get(id);
};

const remove = async id => {
  const matchBoard = await Board.findById(id);
  if (!matchBoard) {
    throw new NOT_FOUND_ERROR(`The board with id: ${id} is undefined`);
  }
  // delete all tasks of board, if board was deleted
  taskRepository.removeTasksByBoardId(id);

  return Board.findByIdAndDelete(id);
};

module.exports = { getAll, get, create, update, remove };
