const { Appointment, Doctor, Patient } = require('../models');

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Doctor, attributes: ['nombre', 'especialidad'] },
        { model: Patient, attributes: ['nombre'] }
      ]
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas', error: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { id_medico, id_paciente, fecha } = req.body;
    const appointment = await Appointment.create({ id_medico, id_paciente, fecha });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    await appointment.update({ estado });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita', error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    await appointment.destroy();
    res.json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita', error: error.message });
  }
};