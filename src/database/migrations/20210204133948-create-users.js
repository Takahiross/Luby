'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        localization: {
            type: Sequelize.STRING,
            allowNull: false
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bio: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false
        }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
};
