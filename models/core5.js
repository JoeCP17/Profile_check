'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class core5 extends Sequelize.Model {
    static associate(models) {
    }
  };

  core5.init({
    task1: DataTypes.INTEGER,
    task2: DataTypes.INTEGER,
    task3: DataTypes.INTEGER,
    task4: DataTypes.INTEGER,
    task5: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'core5',
  });
  return core5;
};