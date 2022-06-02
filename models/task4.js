'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task4 extends Sequelize.Model {
    static associate(models) {
    }
  };

  task4.init({
    core1: DataTypes.INTEGER,
    core2: DataTypes.INTEGER,
    core3: DataTypes.INTEGER,
    core4: DataTypes.INTEGER,
    core5: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'task4',
  });
  return task4;
};