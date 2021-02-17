'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
	 
	 return Promise.all([
      queryInterface.addColumn(
        'users', // table name
        'jabatan', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
	  queryInterface.addColumn(
        'users', // table name
        'pangkat', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
	  queryInterface.addColumn(
        'users', // table name
        'golongan', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
	 return Promise.all([
      queryInterface.removeColumn('users', 'jabatan'),
      queryInterface.removeColumn('users', 'pangkat'),
      queryInterface.removeColumn('users', 'golongan'),
    ]);
  }
};
