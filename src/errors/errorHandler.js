const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const logger = require('../logger/logger');

const handle = (error, req, res, next) => {
  if (error.status) {
    res.status(error.status).send(error.message);
  } else {
    logger.error(error.stack);
    // 500
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = handle;
