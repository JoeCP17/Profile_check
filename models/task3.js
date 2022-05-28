'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task3 extends Model {

    static associate(models) {

    }
  };
  task3.init({
    core1: DataTypes.INTEGER,
    core2: DataTypes.INTEGER,
    core3: DataTypes.INTEGER,
    core4: DataTypes.INTEGER,
    core5: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'task3',
  });
  return task3;
};