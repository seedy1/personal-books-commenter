import Fastify, {FastifyInstance} from "fastify";
import * as bookSchema  from "../schemas/json/bookBody.json";
import { getRepository, getManager } from "typeorm";
import { Book } from "../models/Book";
import { BookBody } from "../schemas/types/bookBody";

export async function bookRoutes(fastify: FastifyInstance){
    fastify.addSchema(bookSchema);

    fastify.route({
        method: 'GET',
        url: '/books',
        schema: {
            response: {200: bookSchema}
        },
        handler: async function (request, reply) {
            const booksRepo = await getRepository(Book);
            const books = await booksRepo.find();
            // reply.send(books);
            reply.send(books);            
        }
    });

    // fastify.get('/books', async( req, reply) =>{
    // fastify.get('/books', {schema: {response:{200: bookSchema}}}, async( req, reply) =>{
    //     const booksRepo = await getRepository(Book);
    //     const books = await booksRepo.find();
    //     // reply.send(books);
    //     return books;
    // });


    // fastify.post('/book', async (req, reply) =>{
    //     return req.body; 
    // });

    fastify.route<{Body: BookBody}>({
        method: 'POST',
        url: '/books',
        schema: {
            body: bookSchema,
            response: {200: bookSchema}
        },
        handler: async function (request, reply): Promise<BookBody> {
            return request.body;
            
        }
    });

    // fastify.route<{Body: BookBody }>(
    //     "/books",{
    //     schema: {
    //         body: bookSchema,
    //         response: {200: bookSchema}
    //     },
    //     handler: (req, reply) => {
    //         return req.body; 
    //     }
    // });

  
}
