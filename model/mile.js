const {DataTypes} = require('sequelize');
const db = require('../db');

const Mile = db.define('mile', {
    StartingMileage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  EndingMileage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  MilesDriven: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CostOfGas: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  GallonsOfGasUsed: {
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

module.exports = Mile;