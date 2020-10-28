const router = require('express').Router();
const { toResponse } = require('./user.model');
const usersService = require('./user.service');
const { OK, NO_CONTENT } = require('http-status-codes');
const wrapAsync = require('../../utils/wrapAsync');

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(toResponse));
  })
);

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.status(OK).send(toResponse(user));
  })
);

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const user = await usersService.create(req.body);
    res.status(OK).send(toResponse(user));
  })
);

router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.status(OK).send(toResponse(user));
  })
);

router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    // const deletedUser
    await usersService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

module.exports = router;
