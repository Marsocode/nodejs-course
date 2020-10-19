// const User = require('../resources/users/user.model');
// const Board = require('../resources/boards/board.model');
const { logger } = require('../utils/logger');
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
  try {
    return DB;
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
};

const getUser = async id => {
  try {
    const user = DB.filter(el => el.id === id.toString())[0];
    return user;
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
};

const createUser = async user => {
  try {
    DB.push(user);
    const userDB = await getUser(user.id);
    if (!userDB) {
      throw new Error('User is not created');
    }
    return userDB;
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
};

const updateUser = async (id, body) => {
  try {
    const user = await getUser(id);

    if (!user) {
      return null;
    }
    for (const [key, value] of Object.entries(body)) {
      user[key] = value;
    }
    DB[id.toString()] = user;

    return user;
  } catch (e) {
    logger.log('error', e.stack);
  }

  // DB.filter(el => el.id === id.toString())[0].name = user.name;
  // DB.filter(el => el.id === id.toString())[0].login = user.login;
  // DB.filter(el => el.id === id.toString())[0].password = user.password;
  //   console.log(DB.filter(el => el.id === id));
  // return DB.filter(el => el.id === id.toString())[0];
};

const removeUser = async id => {
  try {
    // user=null if his tasks deleteds
    await removeUserFromTask(id);
    // delete user
    const userIdIndex = DB.map(el => el.id).indexOf(id);
    if (userIdIndex > -1) {
      // удалит 1 элемент по индексу
      return DB.splice(userIdIndex, 1);
    }
  } catch (e) {
    logger.log('error', e.stack);
  }
};

// Boards
// boardsDB.push(new Board(), new Board());

const getAllBoards = async () => {
  try {
    // console.log(boardsDB);
    return boardsDB;
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
};

const getBoard = async id => {
  try {
    const board = boardsDB.filter(el => el.id === id.toString())[0];
    return board;
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
};

const createBoard = async board => {
  try {
    boardsDB.push(board);
    const dbBoard = await getBoard(board.id);

    if (!dbBoard) {
      throw new Error('Board is not created');
    }

    return dbBoard;
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
};

const updateBoard = async (id, body) => {
  try {
    const board = await getBoard(id);

    if (!board) {
      return null;
    }
    for (const [key, value] of Object.entries(body)) {
      board[key] = value;
    }
    boardsDB[id.toString()] = board;

    return board;
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
  // old code
  // boardsDB.filter(el => el.id === id)[0].title = board.title;
  // boardsDB.filter(el => el.id === id)[0].columns = board.columns;
  // return boardsDB.filter(el => el.id === id)[0];
};

const removeBoard = async id => {
  try {
    // delete all tasks through board
    tasksDB = tasksDB.filter(el => el.boardId !== id);
    // delete board
    const board = await getBoard(id.toString());
    const index = boardsDB.indexOf(board);

    if (index !== -1) {
      return boardsDB.splice(index, 1);
    }
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
};

// Tasks
// tasksDB.push( new Task());

const getAllTasksByBoardId = async boardId => {
  try {
    const tasks = tasksDB.filter(el => el.boardId === boardId.toString());
    return tasks;
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
};

const getTasksByBoardIdAndByTaskId = async (boardId, id) => {
  try {
    const tasks = await getAllTasksByBoardId(boardId.toString());
    const taskById = tasks.filter(el => el.id === id.toString())[0];
    // console.log(taskById);
    return taskById;
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
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
    logger.log('error', e.stack);
    // console.log(e);
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
    logger.log('error', e.stack);
    // console.log(e);
  }
};

const removeTask = async (boardId, id) => {
  try {
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
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
};

const removeTasksByBoard = async boardId => {
  tasksDB = tasksDB.filter(el => el.boardId !== boardId);
  // console.log(tasksDB);
};

const removeUserFromTask = async userId => {
  try {
    const task = tasksDB.filter(el => el.userId === userId);
    task.forEach(item => {
      item.userId = null;
    });
  } catch (e) {
    logger.log('error', e.stack);
    // console.log(e);
  }
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
