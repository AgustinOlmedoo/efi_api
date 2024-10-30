'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.Doctor, { foreignKey: 'id_usuario' });
      User.hasOne(models.Patient, { foreignKey: 'id_usuario' });
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    rol: DataTypes.ENUM('admin', 'médico', 'paciente')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};