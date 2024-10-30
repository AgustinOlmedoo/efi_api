const { Patient, User } = require('../models');

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      include: [{ model: User, attributes: ['nombre', 'correo'] }]
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pacientes', error: error.message });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const { nombre, fecha_nacimiento, id_usuario } = req.body;
    const patient = await Patient.create({ nombre, fecha_nacimiento, id_usuario });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el paciente', error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, fecha_nacimiento } = req.body;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    await patient.update({ nombre, fecha_nacimiento });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el paciente', error: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    await patient.destroy();
    res.json({ message: 'Paciente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paciente', error: error.message });
  }
};