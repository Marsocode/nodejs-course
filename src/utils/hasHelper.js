const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(saltRounds);
  // console.log(`SALT${salt}`);

  const hash = await bcrypt.hash(password, salt);
  // console.log(`HASH${hash}`);

  return hash;
};

const checkHashedPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPassword,
  checkHashedPassword
};
