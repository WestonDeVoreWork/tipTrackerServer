const {DataTypes} = require('sequelize');
const db = require('../db');

const Tips = db.define('tips', {
  TotalIncomeFromTips: {
  type: DataTypes.STRING,
  allowNull: false
  },
  NumberOfTipsReceived: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NumberOfDeliveries: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  StartingTime: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  EndingTime: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  TotalTimeDelivering: {
    type: DataTypes.STRING,
    allowNull: true
  },
  IncomePerHour: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  date: {
      type: DataTypes.STRING,
      allowNull: false
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Tips;