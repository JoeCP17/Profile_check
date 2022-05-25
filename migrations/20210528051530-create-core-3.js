'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('core3s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task1: {
        type: Sequelize.INTEGER
      },
      task2: {
        type: Sequelize.INTEGER
      },
      task3: {
        type: Sequelize.INTEGER
      },
      task4: {
        type: Sequelize.INTEGER
      },
      task5: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('core3s');
  }
};