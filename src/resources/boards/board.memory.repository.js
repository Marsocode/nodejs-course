const boardsDB = require('../../common/inMemoryDb');

const getAll = async () => {
  return boardsDB.getAllBoards();
};

const get = async id => {
  const board = await boardsDB.getBoard(id);

  return board;
};

const create = async board => {
  return boardsDB.createBoard(board);
};

const update = async (id, body) => {
  return await boardsDB.updateBoard(id, body);
};

const remove = async id => {
  return await boardsDB.removeBoard(id);
};

module.exports = { getAll, get, create, update, remove };
