
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite connected successfully');
  } catch (error) {
    console.error('Unable to connect to SQLite:', error);
  }
};

module.exports = { sequelize, connectDB };


