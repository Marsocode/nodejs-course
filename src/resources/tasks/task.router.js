// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const router = require('express').Router({ mergeParams: true });
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
      // res.json(task);
      res.status(200).json(task);
    } else {
      res.status(404).send('TASK NOT FOUND');
    }
  } catch (e) {
    // console.log(e.message);
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  // console.log(req);
  try {
    const task = await tasksService.create(
      req.params.boardId,
      req.body
      // new Task({
      //   id: req.body.id,
      //   title: req.body.title,
      //   order: req.body.order,
      //   description: req.body.description,
      //   userId: req.body.userId,
      //   boardId: req.body.boardId,
      //   columnId: req.body.columnId
      // })
    );

    if (task) {
      res.status(200).json(task);
    } else if (task === null) {
      res.status(404).send('Task not found');
    } else {
      res.status(400).send('Bad request');
    }
    // console.log(res);
  } catch (e) {
    console.log(e);
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
      res.status(404).send('Task not found');
    } else {
      res.status(400).send('Bad request');
    }
  } catch (e) {
    console.log(e);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params.boardId, req.params.id);
    res.status(204).send('The task has been deleted');
  } catch (e) {
    res.status(404).send('Not found');
    console.log(e);
  }
});

module.exports = router;
