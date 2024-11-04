const Sequelize = require('sequelize');

const sequelize = new Sequelize('***','***','***',{
    dialect:'mysql',
    host:'localhost',
});

module.exports = sequelize;
