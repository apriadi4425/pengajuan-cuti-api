'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reminder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reminder.hasMany(models.ReminderListPegawai, {as : 'pegawai', foreignKey : 'id_reminder'})
    }
  };
  Reminder.init({
    jenis: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
    judul: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reminder',
  });
  return Reminder;
};
