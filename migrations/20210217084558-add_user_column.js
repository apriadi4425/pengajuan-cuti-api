'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'users', // table name
          'otoritas', // new field name
          {
            type: Sequelize.BIGINT,
            allowNull: true,
          },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'otoritas'),
    ]);
  }
};
