const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema({
  title: String,
  columns: [
    {
      title: String,
      order: Number
    }
  ]
});

const toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = {
  Board: mongoose.model('boards', Board),
  toResponse
};

// class Board {
//   constructor({
//     id = uuid(),
//     title = 'First',
//     columns = [
//       {
//         id: null,
//         title: 'Column 1',
//         order: 0
//       }
//     ]
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }

//   static toResponse(board) {
//     const { id, title, columns } = board;
//     return { id, title, columns };
//   }
// }
