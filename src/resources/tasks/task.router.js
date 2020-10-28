// you need to set mergeParams: true on the router, if you want to access params from the parent router
const router = require('express').Router({ mergeParams: true });
const { toResponse } = require('./task.model');
const tasksService = require('./task.service');
const { OK, NO_CONTENT } = require('http-status-codes');
const wrapAsync = require('../../utils/wrapAsync');

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.status(OK).json(tasks.map(toResponse));
  })
);

router.get(
  '/:taskId',
  wrapAsync(async (req, res) => {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    res.status(OK).send(toResponse(task));
  })
);

router.post(
  '/',
  wrapAsync(async (req, res) => {
    // console.log(req);
    const task = await tasksService.create(req.params.boardId, req.body);
    res.status(OK).send(toResponse(task));
  })
);

router.put(
  '/:taskId',
  wrapAsync(async (req, res) => {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.status(OK).send(toResponse(task));
  })
);

router.delete(
  '/:taskId',
  wrapAsync(async (req, res) => {
    await tasksService.remove(req.params.boardId, req.params.taskId);
    res.sendStatus(NO_CONTENT);
  })
);

module.exports = router;
