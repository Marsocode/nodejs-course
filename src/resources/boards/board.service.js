const boardsRepo = require('./board.DB.repository');

// так как метод getAll (функция) асинхронный, то тут мы получим промис, и далее в router мы его передаем
const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const update = (id, board) => boardsRepo.update(id, board);

const remove = id => boardsRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
