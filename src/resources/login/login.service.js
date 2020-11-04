/* eslint-disable no-else-return */
const { User } = require('../users/user.model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { FORBIDDEN } = require('../../errors/appError');
const { checkHashedPassword } = require('../../utils/hasHelper');

const signToken = async (login, password) => {
  const user = await User.findOne({ login });
  //   console.log(user);
  if (!user) {
    throw new FORBIDDEN();
  } else {
    //   достаем захэшированный пароль из базы и сравниваем его с пришедшим паролем
    const { password: hashedPassword } = user;

    const comparisonRes = await checkHashedPassword(password, hashedPassword);
    // console.log(`comparisonRes ${comparisonRes}`);

    if (!comparisonRes) throw new FORBIDDEN();

    const { id } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
    return token;
  }
};

module.exports = {
  signToken
};
