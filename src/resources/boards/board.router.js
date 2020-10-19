const router = require('express').Router();
// const User = require('./user.model');
const Board = require('./board.model');
const boardsService = require('./board.service');
const { logger } = require('../../utils/logger');
const createError = require('http-errors');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    // тут мы ожидаем массив
    res.status(200);
    res.json(boards);
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);

    if (board) {
      res.status(200);
      res.json(board);
    } else {
      res.status(404).send('The board is not found!');
      throw new createError(
        404,
        `The board with Id: ${req.params.id} is not found! HTTP STATUS CODE: ${res.statusCode}`
      );
    }
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
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
    } else {
      res.status(400).send('The board has not been created! Bad request');
      throw new createError(
        400,
        `The board has not been created! Bad request. HTTP STATUS CODE: ${res.statusCode}`
      );
    }
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update(
      req.params.id,
      req.body
      // new Board({
      //   title: req.body.title,
      //   columns: req.body.columns
      // })
    );

    if (board) {
      res.status(200).json(board);
    } else {
      res.status(400).send('The board has not been updated! Bad request');
      throw new createError(
        400,
        `The board has not been updated! Bad request. HTTP STATUS CODE: ${res.statusCode}`
      );
    }
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const deletedBoard = await boardsService.remove(req.params.id);
    if (deletedBoard) {
      res.status(204).send('The board has been deleted');
    } else {
      res.status(404).send('The board is not found!');
      throw new createError(
        404,
        `The board with Id: ${req.params.id} is not found! HTTP STATUS CODE: ${res.statusCode}`
      );
    }
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
  }
});

module.exports = router;
