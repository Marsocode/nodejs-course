// you need to set mergeParams: true on the router, if you want to access params from the parent router
const router = require('express').Router({ mergeParams: true });
// const boardsService = require('./board.service');
const tasksService = require('./task.service');
const { logger } = require('../../utils/logger');
const createError = require('http-errors');

router.route('/').get(async (req, res) => {
  try {
    const tasksByBoardId = await tasksService.getAll(req.params.boardId);

    res.status(200).json(tasksByBoardId);
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.id);

    if (task) {
      // res.json(task);
      res.status(200).json(task);
    } else {
      res.status(404).send('The task is not found!');
      throw new createError(
        404,
        `The task with boardId: ${req.params.boardId} and taskId: ${req.params.id} is not found! HTTP STATUS CODE: ${res.statusCode}`
      );
    }
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
  }
});

router.route('/').post(async (req, res) => {
  // console.log(req);
  try {
    const task = await tasksService.create(req.params.boardId, req.body);

    if (task) {
      res.status(200).json(task);
    } else if (task === null) {
      res.status(404).send('The task is not found!');
      throw new createError(
        404,
        `The task with boardId: ${req.params.boardId} is not found!`
      );
    } else {
      res.status(400).send('The task has not been created! Bad request');
      throw new createError(
        400,
        `The task has not been created! Bad request. HTTP STATUS CODE: ${res.statusCode}`
      );
    }
    // console.log(res);
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.id,
      req.body
    );

    if (task) {
      res.status(200).json(task);
    } else if (task === null) {
      res.status(404).send('The task is not found!');
      throw new createError(
        404,
        `The task with boardId: ${req.params.boardId} and taskId: ${req.params.id} is not found! HTTP STATUS CODE: ${res.statusCode}`
      );
    } else {
      res.status(400).send('The task has not been updated! Bad request');
      throw new createError(
        400,
        `The task has not been updated! Bad request. HTTP STATUS CODE: ${res.statusCode}`
      );
    }
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const deletedTask = await tasksService.remove(
      req.params.boardId,
      req.params.id
    );
    if (deletedTask) {
      res.status(204).send('The task has been deleted!');
    } else {
      res.status(404).send('The task is not found!');
      throw new createError(
        404,
        `The task with boardId: ${req.params.boardId} and taskId: ${req.params.id} is not found! HTTP STATUS CODE: ${res.statusCode}`
      );
    }
  } catch (e) {
    // res.status(404).send('The task is not found!');
    logger.error(e.stack);
    // console.log(e);
  }
});

module.exports = router;
