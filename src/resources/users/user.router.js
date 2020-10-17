const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  // показываем всех users (реализация getAll пишется в отдельном файле service (то есть сама обработка данных))
  // так как метод getAll (функция) асинхронный, то сюда передается промис,
  // но тут у нас есть await (то есть в user уже попадет конкретное значение, того что нам надо)
  try {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    // тут мы ожидаем массив
    res.json(users.map(User.toResponse));
  } catch (e) {
    console.log(e);
  }
});

// get user by ID (id передается как pass параметр (то есть напрямую http://localhost:4000/user/:id))
router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);

    // ловим одного юзера (.toResponse - статический метод, то есть должен быть указан аргумент в скобках обязательно (в данном случае как раз наш поисковый user) см. user.model.js)
    if (user) {
      res.status(200);
      res.json(User.toResponse(user));
    } else {
      res.status(404).send('The user is not found!');
    }
  } catch (e) {
    console.log(e);
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
    }
  } catch (e) {
    console.log(e);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(
      req.params.id,
      new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name
      })
    );
    if (user) {
      res.status(200);
      res.json(User.toResponse(user));
    } else {
      res.status(400).send('The user has not been updated! Bad request');
    }
  } catch (e) {
    console.log(e);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.status(204).send('The user has been deleted!');
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
