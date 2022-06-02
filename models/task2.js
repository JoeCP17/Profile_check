'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task2 extends Sequelize.Model {
    static associate(models) {
    }
  };

  task2.init({
    core1: DataTypes.INTEGER,
    core2: DataTypes.INTEGER,
    core3: DataTypes.INTEGER,
    core4: DataTypes.INTEGER,
    core5: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'task2',
  });
  return task2;
};