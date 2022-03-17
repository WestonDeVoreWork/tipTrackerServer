const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:wAS96sAVY2@localhost:5432/tiptracker");

// const sequelize = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/tiptracker`, {
//     dialect: 'postgres',
//     ssl: process.env.ENVIRONMENT === 'production'
// })

module.exports = sequelize;