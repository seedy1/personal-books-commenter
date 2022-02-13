import {SwaggerOptions} from "fastify-swagger";

export const swaggerDocs: SwaggerOptions = {
    routePrefix: "/swagger-documentation",
    swagger: {
        info: {
          title: 'Personal Book Commneter API',
          description: 'Testing the Fastify swagger API',
          version: '1.0.0' // api version
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          { name: 'user', description: 'User related end-points' },
          { name: 'code', description: 'Code related end-points' }
        ],
    },
    exposeRoute: true
}