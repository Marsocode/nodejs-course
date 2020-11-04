const router = require('express').Router();
const loginService = require('./login.service');
const { OK } = require('http-status-codes');
// const wrapAsync = require('../../utils/wrapAsync');

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const token = await loginService.signToken(login, password);
  res.status(OK).json({ token });
});

module.exports = router;
