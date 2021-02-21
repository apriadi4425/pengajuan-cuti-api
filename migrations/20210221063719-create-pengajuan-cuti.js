'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PengajuanCutis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      atasan_langsung: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      nama_ketua: {
        type: Sequelize.STRING,
      },
      nip: {
        type: Sequelize.STRING,
      },
      tanggal_pengajuan: {
        type: Sequelize.DATE
      },
      tanggal_awal_cuti: {
        type: Sequelize.DATE
      },
      tanggal_akhir_cuti: {
        type: Sequelize.DATE
      },
      jenis_cuti: {
        type: Sequelize.INTEGER
      },
      alasan_cuti: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      pertimbangan_atasan_langsung: {
        type: Sequelize.TEXT('long')
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
    await queryInterface.dropTable('PengajuanCutis');
  }
};
