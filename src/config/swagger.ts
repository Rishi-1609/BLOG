import swaggerJsDoc from 'swagger-jsdoc';

const PORT = process.env.PORT;

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BLOG API",
      version: "1.0.0",
      description: "Blog API Project (Basic CRUD using Node JS + TypeScript)"
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
