const router = require('express').Router();
// const User = require('./user.model');
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    // тут мы ожидаем массив
    // res.json(boards.map(Board.toResponse));
    res.status(200);
    res.json(boards);
  } catch (e) {
    console.log(e);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);

    if (board) {
      res.json(Board.toResponse(board));
    }
  } catch (e) {
    // console.log(e);
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  // вызываем сервис и передаем туда тело запроса - данные нового board (то есть title, columns)
  try {
    const board = await boardsService.create(
      new Board({
        title: req.body.title,
        columns: req.body.columns
      })
    );

    if (board) {
      res.status(200).json(board);
    }
  } catch (e) {
    console.log(e);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update(
      req.params.id,
      new Board({
        title: req.body.title,
        columns: req.body.columns
      })
    );

    if (board) {
      res.status(200).json(board);
    }
  } catch (e) {
    console.log(e);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.id);
    res.status(204).send('The board has been deleted');
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
