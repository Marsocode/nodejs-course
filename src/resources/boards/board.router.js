const router = require('express').Router();
const { toResponse } = require('./board.model');
const boardsService = require('./board.service');
const { OK, NO_CONTENT } = require('http-status-codes');
const wrapAsync = require('../../utils/wrapAsync');

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(OK).json(boards.map(toResponse));
  })
);

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.status(OK).send(toResponse(board));
  })
);

router.post(
  '/',
  wrapAsync(async (req, res) => {
    // вызываем сервис и передаем туда тело запроса - данные нового board (то есть title, columns)
    const board = await boardsService.create(req.body);
    res.status(OK).send(toResponse(board));
  })
);

router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    res.status(OK).send(toResponse(board));
  })
);

router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

module.exports = router;
