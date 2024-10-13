const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodeapp','root','admin123',{
    dialect:'mysql',
    host:'localhost',
});

module.exports = sequelize;
