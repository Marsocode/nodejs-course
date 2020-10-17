// в DB лежат все users, поэтому импортируем сюда для дальнейшей обработки
const DB = require('../../common/inMemoryDb');

const getAll = async () => {
  return DB.getAllUsers();
};

// если запрос по id, то делаем функцию get- поиска запращиваемого id (так как у нас пока просто массив с юзерами, то используем метод getUser внутри которого filter)
const get = async id => {
  const user = await DB.getUser(id);
  // если юзер не найден, то показываем ошибку
  if (!user) {
    throw new Error(`The user with id: ${id} is undefined`);
  }

  return user;
};

// создаем нового пользователя (в данном случае просто добавляем его в массив с помощью функции createUser)
const create = async user => {
  return DB.createUser(user);
};

// обновляем данные пользователя (пользователь достается по id)
const update = async (id, user) => {
  // const matchUser = await DB.updateUser(id, user);
  // if (!matchUser) {
  //   throw new Error(`The user with id: ${id} is undefined. You can't update, but you can create!`);
  // }

  return await DB.updateUser(id, user);
};

const remove = async id => {
  return await DB.removeUser(id);
};

module.exports = { getAll, get, create, update, remove };
