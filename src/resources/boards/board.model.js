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
