const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  // показываем всех users (реализация getAll пишется в отдельном файле service (то есть сама обработка данных))
  // так как метод getAll (функция) асинхронный, то сюда передается промис,
  // но тут у нас есть await (то есть в user уже поадет конкретное значение, того что нам надо)
  const users = await usersService.getAll();

  // map user fields to exclude secret fields like "password"
  // тут мы ождаем массив
  res.json(users.map(User.toResponse));
});

// get user by ID (id передается как pass параметр (то есть напрямую http://localhost:4000/user/:id))
router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);

    // ловим одного юзера (.toResponse - статический метод, то есть должен быть указан аргумент в скобках обязательно (в данном случае как раз наш поисковый user) см. user.mode.js)
    res.json(User.toResponse(user));
  } catch (e) {
    // res.status(404).send("The user is not found!");
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  // console.log(req);
  // вызываем сервис и передаем туда тело запроса - данные нового юзера (то есть имя, логин, пароль)
  const user = await usersService.create(
    new User({
      login: req.body.login,
      name: req.body.name,
      password: req.body.password
    })
  );

  // передаем нашего нового юзера
  res.json(User.toResponse(user));
});

// get user by ID (id передается как pass параметр (то есть напрямую http://localhost:4000/user/:id))
router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(
    req.params.id,
    new User({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    })
  );
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.status(204).send('The user has been deleted');
  } catch (e) {
    res.send(e.message);
  }

  // также должен удалять все такси этого usera! надо сделать
});

module.exports = router;
