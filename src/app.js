require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { errorHandler } = require('./middlewares/errorHandler.middleware');

const authRoutes = require('./routes/auth.routes');
const dokterRoutes = require('./routes/dokter.routes');
const antreanRoutes = require('./routes/antrean.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dokter', dokterRoutes);
app.use('/api/antrean', antreanRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Puskesmas API is running 🏥', docs: '/api-docs' });
});

// Global error handler (wajib paling bawah)
app.use(errorHandler);

module.exports = app;
