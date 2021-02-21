'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PengajuanCuti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PengajuanCuti.init({
    user_id: DataTypes.INTEGER,
    tanggal_pengajuan: DataTypes.DATE,
    tanggal_awal_cuti: DataTypes.DATE,
    tanggal_akhir_cuti: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PengajuanCuti',
  });
  return PengajuanCuti;
};