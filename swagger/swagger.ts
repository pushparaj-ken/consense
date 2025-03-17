import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc, { Options, SwaggerDefinition } from 'swagger-jsdoc';
import express, { Application } from 'express';

export function generateSwagger(title: string, version: string, routes: string[]) {
  const swaggerDefinition: SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title,
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  };

  const swaggerOptions: Options = {
    swaggerDefinition,
    apis: routes,
  };

  return swaggerJsdoc(swaggerOptions);
}

export function serveSwagger(app: Application, swaggerSpec: object, route: string): void {
  app.use(route, swaggerUi.serveFiles(swaggerSpec, { explorer: true }), swaggerUi.setup(swaggerSpec));
}
