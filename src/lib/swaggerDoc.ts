import {SwaggerOptions} from "fastify-swagger";

export const swaggerDocs: SwaggerOptions = {
    routePrefix: "/swagger-documentation",
    swagger: {
        info: {
          title: "Personal Book Commenter API",
          description: "Testing the Fastify API with swagger.",
          version: "1.0.0" // api version
        },
        externalDocs: {
          url: "https://swagger.io",
          description: "Find more info here"
        },
        host: "localhost:3000",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [
          { name: "public", description: "public end-points. Anyone can have access" },
          { name: "private", description: "private auth needed end-points" }
        ],
    },

    exposeRoute: true
};