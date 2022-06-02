'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task1 extends Sequelize.Model {
    static associate(models) {
    }
  };

  task1.init({
    core1: DataTypes.INTEGER,
    core2: DataTypes.INTEGER,
    core3: DataTypes.INTEGER,
    core4: DataTypes.INTEGER,
    core5: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'task1',
  });
  return task1;
};