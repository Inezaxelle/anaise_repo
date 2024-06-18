const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RCA Library API",
      version: "1.0.0",
      description: "API documentation for a RCA Library management system",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./Controllers/*js"], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };