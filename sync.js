const { sequelize } = require('./src/config/db');

const sync = async () => {
  try {
    await sequelize.sync(); 
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
    throw error;
  }
};

module.exports = sync;
