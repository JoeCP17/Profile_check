'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('task1s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      core1: {
        type: Sequelize.INTEGER
      },
      core2: {
        type: Sequelize.INTEGER
      },
      core3: {
        type: Sequelize.INTEGER
      },
      core4: {
        type: Sequelize.INTEGER
      },
      core5: {
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
    await queryInterface.dropTable('task1s');
  }
};