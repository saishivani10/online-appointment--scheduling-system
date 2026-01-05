const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Models for associations
const User = require('./models/User');
const Service = require('./models/Service');
const Appointment = require('./models/Appointment');

// Define Associations
User.hasMany(Service, { foreignKey: 'providerId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'providerId', as: 'provider' });

User.hasMany(Appointment, { foreignKey: 'customerId', as: 'customerAppointments' });
User.hasMany(Appointment, { foreignKey: 'providerId', as: 'providerAppointments' });
Appointment.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
Appointment.belongsTo(User, { foreignKey: 'providerId', as: 'provider' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

// Database Connection
sequelize.sync({ alter: false })
  .then(() => console.log('Database synchronized successfully'))
  .catch(err => console.log('Database sync error:', err));

// Routes
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const serviceRoutes = require('./routes/services');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

