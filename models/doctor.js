'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.User, { foreignKey: 'id_usuario' });
      Doctor.hasMany(models.Appointment, { foreignKey: 'id_medico' });
    }
  }
  Doctor.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};