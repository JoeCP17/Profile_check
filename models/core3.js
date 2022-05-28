'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class core3 extends Model {

    static associate(models) {
  
    }
  };
  core3.init({
    task1: DataTypes.INTEGER,
    task2: DataTypes.INTEGER,
    task3: DataTypes.INTEGER,
    task4: DataTypes.INTEGER,
    task5: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'core3',
  });
  return core3;
};