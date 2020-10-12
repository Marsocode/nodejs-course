const boardsDB = require('../../common/inMemoryDb');

const getAll = async () => {
  return boardsDB.getAllBoards();
};

const get = async id => {
  // если async, то добавляем await!!!
  const board = await boardsDB.getBoard(id);
  // если board не найден, то показываем ошибку
  if (!board) {
    throw new Error(`The board with id: ${id} is undefined`);
  }

  return board;
};

const create = async board => {
  return boardsDB.createBoard(board);
};

const update = async (id, board) => {
  return await boardsDB.updateBoard(id, board);
};

const remove = async id => {
  return await boardsDB.removeBoard(id);
};

module.exports = { getAll, get, create, update, remove };
