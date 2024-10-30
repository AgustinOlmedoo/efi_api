const { Doctor, User } = require('../models');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: [{ model: User, attributes: ['nombre', 'correo'] }]
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los médicos', error: error.message });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const { nombre, especialidad, id_usuario } = req.body;
    const doctor = await Doctor.create({ nombre, especialidad, id_usuario });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el médico', error: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, especialidad, estado } = req.body;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Médico no encontrado' });
    }
    await doctor.update({ nombre, especialidad, estado });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el médico', error: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Médico no encontrado' });
    }
    await doctor.destroy();
    res.json({ message: 'Médico eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el médico', error: error.message });
  }
};