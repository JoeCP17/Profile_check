'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class core4 extends Sequelize.Model {
    static associate(models) {
    }
  };

  core4.init({
    task1: DataTypes.INTEGER,
    task2: DataTypes.INTEGER,
    task3: DataTypes.INTEGER,
    task4: DataTypes.INTEGER,
    task5: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'core4',
  });
  return core4;
};