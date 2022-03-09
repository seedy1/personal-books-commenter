import Fastify, {FastifyInstance} from "fastify";
import * as bookSchema  from "../schemas/json/bookBody.json";
import { getRepository } from "typeorm";
import { Book } from "../models/Book";

import * as queryIdSchema from "../schemas/json/queryId.json";
import { QueryId } from "../schemas/types/queryId";


// public routes
export async function bookRoutes(fastify: FastifyInstance){
    fastify.addSchema(bookSchema);

    // view all books
    fastify.route({
        method: 'GET',
        url: '/books',
        schema: {
            // response: {200: bookSchema}
        },
        handler: async function (request, reply) {

            const booksRepo = getRepository(Book);
            const books = await booksRepo.find({order: {id: "DESC"}});
            
            return reply.send(books);

        }
    });

    // get 1 book by id
    // fastify.route<{Body: BookBody}>({

    fastify.route<{Params: QueryId}>({
        method: 'GET',
        url: '/books/:id',
        schema: {
            params: queryIdSchema,
        },
        handler: async function (request, reply) {

            const id = request.params.id;

            const booksRepo = getRepository(Book);
            const book = await booksRepo.findOneOrFail(id,{
                relations: ["chapters", "chapters.comments", "personas", "personas.comments"]
            });
            
            // const book = await booksRepo.findOne(id);
            // later check if(!book)
            // if()
            return reply.send(book);  
        }
    });

  
}
