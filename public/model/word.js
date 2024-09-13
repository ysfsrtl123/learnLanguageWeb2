const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

// Word modelini tanımlıyoruz
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
  }, {
    freezeTableName: true // Bu tablo ismini değiştirmeyi engeller
});

module.exports = Word;
