// jshint esversion:7
// const User = require('../resources/users/user.model');
// const Board = require('../resources/boards/board.model');
// const Task = require('../resources/tasks/task.model');
const DB = [];
const boardsDB = [];
const tasksDB = [];

// Users
// добавим новых юзеров
// DB.push(new User(), new User(), new User());

// переносим всю логику обработки данных из user.memory.repository сюда
// делаем доп общий метод и передаем туда копию массива DB, чтобы с самой DB ничего не случилось
const getAllUsers = async () => {
  return DB.slice(0);
};

const getUser = async id => {
  return DB.filter(el => el.id === id.toString())[0];
};

const createUser = async user => {
  DB.push(user);
  return user;
};

const updateUser = async (id, user) => {
  DB.filter(el => el.id === id.toString())[0].name = user.name;
  DB.filter(el => el.id === id.toString())[0].login = user.login;
  DB.filter(el => el.id === id.toString())[0].password = user.password;

  //   console.log(DB.filter(el => el.id === id));
  return DB.filter(el => el.id === id.toString())[0];
};

const removeUser = async id => {
  await removeUserFromTask(id);
  const userIdIndex = DB.map(el => el.id).indexOf(id);
  if (userIdIndex > -1) {
    // удалит 1 элемент по индексу
    return DB.splice(userIdIndex, 1);
  }
};

// Boards
// Добавим новые boards
// boardsDB.push(new Board(), new Board());

const getAllBoards = async () => {
  // console.log(boardsDB);
  return boardsDB.slice(0);
};

const getBoard = async id => {
  return boardsDB.filter(el => el.id === id.toString())[0];
};

const createBoard = async board => {
  boardsDB.push(board);
  return board;
};

const updateBoard = async (id, board) => {
  // console.log(board);
  boardsDB.filter(el => el.id === id.toString())[0].title = board.title;
  boardsDB.filter(el => el.id === id.toString())[0].columns = board.columns;

  return boardsDB.filter(el => el.id === id.toString())[0];
};

const removeBoard = async id => {
  await removeTasksByBoard(id);
  const boardIdIndex = boardsDB.map(el => el.id).indexOf(id);
  if (boardIdIndex > -1) {
    // удалит 1 элемент по индексу
    return boardsDB.splice(boardIdIndex, 1);
  }
  // удаляю все таски этого боарда
};

// Tasks
// tasksDB.push( new Task());

const getAllTasksByBoardId = async boardId => {
  const tasks = tasksDB.filter(el => el.boardId === boardId.toString());
  return tasks;
};

const getTasksByBoardIdAndByTaskId = async (boardId, id) => {
  const tasks = await getAllTasksByBoardId(boardId);
  const taskById = tasks.filter(el => el.id === id.toString())[0];
  // console.log(taskById);
  return taskById;
};

const createTask = async (boardId, task) => {
  try {
    task.boardId = boardId.toString();
    tasksDB.push(task);
    // console.log(tasksDB);
    return task;
  } catch (e) {
    console.log(e);
  }
};

const updateTask = async (boardId, id, task) => {
  const taskbyId = await getTasksByBoardIdAndByTaskId(boardId, id);
  console.log(taskbyId);

  if (!taskbyId) {
    return null;
  }

  taskbyId.title = task.title;
  taskbyId.order = task.order;
  taskbyId.description = task.description;
  taskbyId['userId'] = task.userId;
  taskbyId['boardId'] = task.boardId;
  taskbyId['columnId'] = task.columnId;

  return taskbyId;
};

const removeTask = async (boardId, id) => {
  const taskbyId = await getTasksByBoardIdAndByTaskId(
    boardId.toString(),
    id.toString()
  );
  const taskIndex = tasksDB.indexOf(taskbyId);

  if (taskIndex < 0) {
    return false;
  }
  tasksDB.splice(taskIndex, 1);
  return true;
};

const removeTasksByBoard = async boardId => {
  tasksDB.forEach((item, index) => {
    if (item.boardId === boardId) {
      tasksDB.splice(item[index], 1);
    }
  });
  // tasksDB.filter(el => el.boardId !== boardId);

  // console.log(tasksDB);
};

const removeUserFromTask = async userId => {
  const task = tasksDB.filter(el => el.userId === userId);
  task.forEach(item => {
    item.userId = null;
  });
};
module.exports = {
  getAllUsers,
  getAllBoards,
  getAllTasksByBoardId,
  getUser,
  getBoard,
  getTasksByBoardIdAndByTaskId,
  createUser,
  createBoard,
  createTask,
  updateUser,
  updateBoard,
  updateTask,
  removeUser,
  removeBoard,
  removeTask,
  removeTasksByBoard,
  removeUserFromTask
};
