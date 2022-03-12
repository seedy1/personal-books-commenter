import {SwaggerOptions} from "fastify-swagger";

/** Swagger documentation generator*/
export const swaggerDocs: SwaggerOptions = {
    routePrefix: "/swagger-documentation",
    swagger: {
        info: {
          title: "Personal Book Commenter API",
          description: "Testing the Fastify API with swagger.",
          version: "1.0.0" // api version
        },
        host: "localhost:3000",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [
          { name: "public", description: "Public routes that do not require authentication" },
          { name: "auth", description: "Routes for Authentication" },
          { name: "private", description: "Authentication routes for private user operations" },
          { name: "book", description: "Book  routes, both public and private"}
        ]
    },

    exposeRoute: true
};