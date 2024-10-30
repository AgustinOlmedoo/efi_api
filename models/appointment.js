'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.Doctor, { foreignKey: 'id_medico' });
      Appointment.belongsTo(models.Patient, { foreignKey: 'id_paciente' });
    }
  }
  Appointment.init({
    id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('programada', 'realizada', 'cancelada'),
      defaultValue: 'programada'
    }
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};