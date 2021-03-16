'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReminderListPegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ReminderListPegawai.init({
    id_reminder:
        {
          type : DataTypes.INTEGER,
          references: { model: 'reminder', key: 'id' }
        },
    id_pegawai:
        {
          type : DataTypes.INTEGER,
          references: { model: 'user', key: 'id' }
        },
    nama_pegawai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReminderListPegawai',
  });
  return ReminderListPegawai;
};
