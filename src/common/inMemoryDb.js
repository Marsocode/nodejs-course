// const User = require('../resources/users/user.model');
// const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const DB = [];
const boardsDB = [];
let tasksDB = [];

// Users
// добавим новых юзеров
// DB.push(new User(), new User(), new User());

// переносим всю логику обработки данных из user.memory.repository сюда
// делаем доп общий метод и передаем туда копию массива DB, чтобы с самой DB ничего не случилось
const getAllUsers = async () => {
  return DB;
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
// boardsDB.push(new Board(), new Board());

const getAllBoards = async () => {
  // console.log(boardsDB);
  return boardsDB;
};

const getBoard = async id => {
  return boardsDB.filter(el => el.id === id.toString())[0];
};

const createBoard = async board => {
  boardsDB.push(board);
  const dbBoard = await getBoard(board.id);
  if (!dbBoard) {
    throw new Error('Board is not created');
  }
  return dbBoard;
};

const updateBoard = async (id, board) => {
  boardsDB.filter(el => el.id === id)[0].title = board.title;
  boardsDB.filter(el => el.id === id)[0].columns = board.columns;

  return boardsDB.filter(el => el.id === id)[0];
};

const removeBoard = async id => {
  tasksDB = tasksDB.filter(el => el.boardId !== id);
  const board = await getBoard(id.toString());
  const index = boardsDB.indexOf(board);

  if (index !== -1) {
    return boardsDB.splice(index, 1);
  }
};

// Tasks
// tasksDB.push( new Task());

const getAllTasksByBoardId = async boardId => {
  const tasks = tasksDB.filter(el => el.boardId === boardId.toString());
  return tasks;
};

const getTasksByBoardIdAndByTaskId = async (boardId, id) => {
  const tasks = await getAllTasksByBoardId(boardId.toString());

  const taskById = tasks.filter(el => el.id === id.toString())[0];
  // console.log(taskById);
  return taskById;
};

const createTask = async (boardId, taskBody) => {
  try {
    const task = Task.makeTask(taskBody);
    task.boardId = boardId.toString();
    tasksDB.push(task);
    // console.log(tasksDB);
    const dbTask = await getTasksByBoardIdAndByTaskId(task.boardId, task.id);
    return dbTask;
    // return task;
  } catch (e) {
    console.log(e);
  }
};

const updateTask = async (boardId, id, task) => {
  try {
    const taskbyId = await getTasksByBoardIdAndByTaskId(
      boardId.toString(),
      id.toString()
    );
    if (!taskbyId) {
      return null;
    }
    for (const [key, value] of Object.entries(task)) {
      taskbyId[key] = value;
    }
    tasksDB[id.toString()] = taskbyId;
    return taskbyId;
  } catch (e) {
    console.log(e);
  }
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
  tasksDB = tasksDB.filter(el => el.boardId !== boardId);
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
