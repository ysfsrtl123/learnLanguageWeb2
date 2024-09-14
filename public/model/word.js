const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Word = sequelize.define('words', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    word: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Word;