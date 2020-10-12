const usersRepo = require('./user.memory.repository');

// так как метод getAll (функция) асинхронный, то тут мы получим промис, и далее в router мы его передаем
const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = id => usersRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
