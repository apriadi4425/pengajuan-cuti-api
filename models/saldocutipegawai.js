'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaldoCutiPegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SaldoCutiPegawai.init({
    user_id: DataTypes.INTEGER,
    tahun: DataTypes.STRING,
    sisa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SaldoCutiPegawai',
  });
  return SaldoCutiPegawai;
};