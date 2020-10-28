const winston = require('winston');
const morgan = require('morgan');
const path = require('path');
const { timestamp, prettyPrint, combine } = winston.format;
const logFilePath = path.resolve(__dirname, '../../', 'logs', 'info.log');
const errorsFilePath = path.resolve(__dirname, '../../', 'logs', 'errors.log');
const exceptionsFilePath = path.resolve(
  __dirname,
  '../../',
  'logs',
  'exceptions.log'
);

// request logging
morgan.token('url', req => {
  return JSON.stringify(req.originalUrl);
});

morgan.token('query', req => {
  return JSON.stringify(req.query);
});

morgan.token('body', req => {
  // hide password
  return JSON.stringify(req.body).replace(/,("password":").+"/, '$1***"');
});

// формат для вывода логов
const format = combine(timestamp(), prettyPrint());

const options = {
  fileInfo: {
    format,
    level: 'info',
    filename: logFilePath,
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 1024 * 5000,
    maxFiles: 5,
    colorize: false
  },
  fileUnhandled: {
    format,
    level: 'error',
    filename: exceptionsFilePath,
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 1024 * 5000,
    maxFiles: 5,
    colorize: false
  },
  fileError: {
    format,
    level: 'error',
    filename: errorsFilePath,
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 1024 * 5000,
    maxFiles: 5,
    colorize: false
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.fileInfo),
    new winston.transports.File(options.fileError)
  ],
  exceptionHandlers: [new winston.transports.File(options.fileUnhandled)],
  exitOnError: true
});

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true,
      handleRejections: true,
      json: true,
      colorize: false
    })
  );
}
// uncaughtException and unhandledRejection обрабатываются выше

// create a stream object with a 'write' function that will be used by `morgan`
// writing logs
logger.stream = {
  write: message => logger.info(message)
};

module.exports = logger;
