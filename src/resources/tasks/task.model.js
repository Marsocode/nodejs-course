const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { collection: 'tasks' }
);

const toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = {
  Task: mongoose.model('tasks', Task),
  toResponse
};

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'Task 1',
//     order = 0,
//     description = 'Just do it',
//     userId = '',
//     boardId = '',
//     columnId = ''
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }

//   static toResponse(task) {
//     const { id, title, order, userId, boardID, columnId } = task;
//     return { id, title, order, userId, boardID, columnId };
//   }
// }

// module.exports = Task;
