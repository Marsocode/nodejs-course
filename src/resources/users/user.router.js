const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { logger } = require('../../utils/logger');
const createError = require('http-errors');

router.route('/').get(async (req, res) => {
  // показываем всех users (реализация getAll пишется в отдельном файле service (то есть сама обработка данных))
  // так как метод getAll (функция) асинхронный, то сюда передается промис,но тут у нас есть await (то есть в user уже попадет конкретное значение, того что нам надо)
  try {
    const users = await usersService.getAll();

    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);

    // ловим одного юзера (.toResponse - статический метод, то есть должен быть указан аргумент в скобках обязательно (в данном случае как раз наш поисковый user) см. user.model.js)
    if (user) {
      res.status(200);
      res.json(User.toResponse(user));
    } else {
      res.status(404).send('The user is not found!');
      throw new createError(
        404,
        `The user with Id: ${req.params.id} is not found! HTTP STATUS CODE: ${res.statusCode}`
      );
    }
  } catch (e) {
    logger.error(e.message);
    // console.log(e);
  }
});

router.route('/').post(async (req, res) => {
  try {
    // вызываем сервис и передаем туда тело запроса - данные нового юзера (то есть имя, логин, пароль)
    const user = await usersService.create(
      new User({
        login: req.body.login,
        name: req.body.name,
        password: req.body.password
      })
    );
    if (user) {
      res.status(200);
      res.json(User.toResponse(user));
    } else {
      res.status(400).send('The user has not been created! Bad request');
      throw new createError(
        400,
        `The user has not been created! Bad request. HTTP STATUS CODE: ${res.statusCode}`
      );
    }
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(
      req.params.id,
      req.body
      // new User({
      //   login: req.body.login,
      //   password: req.body.password,
      //   name: req.body.name
      // })
    );
    if (user) {
      res.status(200);
      res.json(User.toResponse(user));
    } else {
      res.status(400).send('The user has not been updated! Bad request');
      throw new createError(
        400,
        `The user has not been updated! Bad request. HTTP STATUS CODE: ${res.statusCode}`
      );
    }
  } catch (e) {
    logger.error(e.stack);
    // console.log(e);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const deletedUser = await usersService.remove(req.params.id);
    if (deletedUser) {
      res.status(204).send('The user has been deleted!');
    } else {
      res.status(404).send('The user is not found!');
      throw new createError(
        404,
        `The user with Id: ${req.params.id} is not found! HTTP STATUS CODE: ${res.statusCode}`
      );
    }
  } catch (e) {
    // res.send(e.message);
    logger.error(e.stack);
  }
});

module.exports = router;
