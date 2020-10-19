const winston = require('winston');
const morgan = require('morgan');
const path = require('path');

const logFilePath = path.resolve(__dirname, '../../', 'logs', 'log_data.log');
const errorsFilePath = path.resolve(
  __dirname,
  '../../',
  'logs',
  'errors_data.log'
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: logFilePath,
      format: winston.format.printf(i => (i.level === 'info' ? i.message : '')),
      // format: winston.format.printf(info => i),
      json: true,
      maxsize: 5242880,
      maxFiles: 1,
      colorize: true
    }),
    new winston.transports.File({
      level: 'error',
      filename: errorsFilePath,
      format: winston.format.printf(i =>
        i.level === 'error' ? i.message : ''
      ),
      json: true,
      maxsize: 5242880,
      maxFiles: 1,
      colorize: true
    }),
    new winston.transports.Console({
      format: winston.format.printf(i => i.message),
      colorize: true
    })
  ],
  // do not exit on handled exceptions
  // If false, handled exceptions will not cause process.exit
  exitOnError: false
});

// create a stream object with a 'write' function that will be used by `morgan`
// writing request in file log_data.log
logger.stream = {
  write(message) {
    logger.info(message);
  }
};

// request logging
morgan.token('url', req => {
  return JSON.stringify(req.originalUrl);
});

morgan.token('params', req => {
  return JSON.stringify(req.params);
});

morgan.token('body', req => {
  return JSON.stringify(req.body);
});

// const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const requestLogger = morgan(
  // 'combined',
  'DATE: :date[web] || METHOD: :method || URL: :url || QUERY PARAMETERS: :params || REQUEST BODY: :body || HTTP STATUS: :status || RESPONSE TIME: :response-time ms',
  { stream: logger.stream }
);

process.on('uncaughtException', error => {
  logger.error(`captured error: ${error.message}`);
  // logger.error(`captured error: ${error.message}, ${error.stack}`);
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhadled rejection detected: ${reason.message}`);
  // logger.error(`Unhadled rejection detected: ${reason.message}, ${promise.stack}`);
});

const handlerErrors = (error, req, res) => {
  logger.log('error', '500 status code. Internal server error.');
  res.status(500).send('Internal server error');
};

module.exports = { requestLogger, handlerErrors };
