'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task5 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  task5.init({
    core1: DataTypes.INTEGER,
    core2: DataTypes.INTEGER,
    core3: DataTypes.INTEGER,
    core4: DataTypes.INTEGER,
    core5: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'task5',
  });
  return task5;
};