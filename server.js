const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Asegúrate de que la ruta sea correcta
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173' // Permite solicitudes desde el frontend en este puerto
}));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Error al sincronizar con la base de datos:", error);
});
