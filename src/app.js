const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { requestLogger, handlerErrors } = require('./utils/logger');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// logger
app.use(requestLogger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   res.status(err.status || 500).send('Something broke!');
//   next();
// });

app.use(handlerErrors);

// To check task3 "Logging & Error Handling" point 3: добавлены обработка и логирование ошибок на событие uncaughtException
// throw Error('Oops!');

// To check task3 "Logging & Error Handling" point 4: добавлены обработка и логирование ошибок на событие unhandledRejection)
// Promise.reject(Error('Oops!'));

module.exports = app;
