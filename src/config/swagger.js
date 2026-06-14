const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Puskesmas Queue API',
      version: '1.0.0',
      description: 'API Manajemen Antrean Puskesmas — Neo Telemetri Capstone 2026',
    },
    servers: [
      { url: process.env.BASE_URL || 'http://localhost:3000', description: 'Server' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
