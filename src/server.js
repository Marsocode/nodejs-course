const logger = require('./logger/logger');
const { User } = require('./resources/users/user.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');

const app = require('./app');

const createAdmin = async () => {
  try {
    const password = await bcrypt.hash('admin', 10);
    User.create({ login: 'admin', password });
  } catch (e) {
    logger.error(e);
  }
};

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () => console.log('MongoDB connection error:'));
db.once('open', () => {
  // await usersRepo.create({ login: 'admin', password: 'admin' });
  createAdmin();
  console.log('Successfully connect to DB');
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

// db.on('error', () => logger.error('MongoDB connection error:')).once(
//   'open',
//   () => {
//     logger.info('Successfully connect to DB');
//     app.listen(PORT, () =>
//       logger.info(`App is running on http://localhost:${PORT}`)
//     );
//   }
// );
