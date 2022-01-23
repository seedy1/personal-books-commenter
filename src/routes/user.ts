import { FastifyInstance } from "fastify";


export async function userRoutes(fastify: FastifyInstance) {
    
    // view all books
    fastify.route({
        method: 'GET',
        url: '/me',
        schema: {
            // response: {200: bookSchema}
        },
        handler: async function (request, reply) {
            // const booksRepo = await getRepository(Book);
            // const books = await booksRepo.find({order: {id: "DESC"}});
            // reply.send(books);
            console.log("books");
            // console.log(books);
            
            return reply.send({message:"user profile route"});
            // return books;

        }
    });

}