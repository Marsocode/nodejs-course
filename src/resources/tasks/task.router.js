// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const router = require('express').Router({ mergeParams: true });
// const router = require('express').Router();
const Task = require('./task.model');
// const boardsService = require('./board.service');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasksByBoardId = await tasksService.getAll(req.params.boardId);

  // тут мы ожидаем массив
  res.status(200).json(tasksByBoardId);
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.id);

    if (task) {
      res.json(Task.toResponse(task));
      // res.send(200).json(task);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  // console.log(req);
  try {
    const task = await tasksService.create(
      req.params.boardId,
      new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.body.boardId,
        columnId: req.body.columnId
      })
    );

    res.status(200).json(task);
    // console.log(res);
  } catch (e) {
    console.log(e);
  }
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(
    req.params.boardId,
    req.params.id,
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.body.boardId,
      columnId: req.body.columnId
    })
  );

  res.status(200).json(task);
});

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params.boardId, req.params.id);
    res.status(204).send('The task has been deleted');
  } catch (e) {
    res.status(404).send('Not found');
    console.log(e);
  }

  // также должен удалять все таски этого usera! надо сделать
});

module.exports = router;
