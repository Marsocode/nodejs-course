const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Task 1',
    order = 0,
    description = 'Just do it',
    userId = 'null',
    boardId = 'null',
    columnId = 'null'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, userId, boardID, columnId } = task;
    return { id, title, order, userId, boardID, columnId };
  }
}

module.exports = Task;
