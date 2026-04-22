const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TicketGo API',
      version: '1.0.0',
      description: 'API documentation'
    },
    servers: [
      {
        url: 'http://localhost:3002/',
        description: 'Local server'
      }
    ]
  },
  apis: ["../routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);


module.exports = swaggerSpec