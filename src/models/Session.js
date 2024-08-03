const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const User = require('./User');

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  loginTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  logoutTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Session;
