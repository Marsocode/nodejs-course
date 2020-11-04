const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../errors/appError');
const { JWT_SECRET_KEY } = require('../common/config');
const NO_AUTH_URLS = ['/', '/login', '/doc'];

module.exports = (req, res, next) => {
  if (NO_AUTH_URLS.includes(req.path)) return next();

  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');
    // console.log(tokenString);
    const [type, token] = tokenString.split(' ');
    if (type !== 'Bearer') {
      throw new UNAUTHORIZED();
    } else {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
        // console.log(result);
      } catch {
        throw new UNAUTHORIZED();
      }
      return next();
    }
  }
  throw new UNAUTHORIZED();
};
