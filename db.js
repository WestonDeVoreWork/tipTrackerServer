const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:wAS96sAVY2@localhost:5432/tiptracker");

module.exports = sequelize;