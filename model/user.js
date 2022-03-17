const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Occupation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
});

module.exports = User;