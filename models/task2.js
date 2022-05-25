'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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