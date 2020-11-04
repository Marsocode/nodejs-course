const { NOT_FOUND, UNAUTHORIZED, FORBIDDEN } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(entity, params, message) {
    super(
      message || `Couldn't find a ${entity} with:${JSON.stringify(params)}`
    );
    this.status = NOT_FOUND;
  }
}

class Unauthorized extends Error {
  constructor(entity, params, message) {
    super(message || 'Unauthorized user!');
    this.status = UNAUTHORIZED;
  }
}

class Forbidden extends Error {
  constructor(entity, params, message) {
    super(message || 'Wrong login/password');
    this.status = FORBIDDEN;
  }
}

module.exports = {
  NOT_FOUND_ERROR: NotFoundError,
  UNAUTHORIZED: Unauthorized,
  FORBIDDEN: Forbidden
};
