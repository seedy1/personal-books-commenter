import Fastify, {FastifyInstance} from "fastify";
import * as bookSchema  from "../schemas/json/bookBody.json";
import { getRepository, getManager } from "typeorm";
import { Book } from "../models/Book";
import { BookBody } from "../schemas/types/bookBody";
import { bookRating, Genres } from "../shared/constants";

import * as queryIdSchema from "../schemas/json/queryId.json";
import { QueryId } from "../schemas/types/queryId";

import { isUserAuthenticated } from "../lib/isUserAuth";
import { Users } from "../models/Users";


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

            const booksRepo = await getRepository(Book);
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
            // response: {200: bookSchema}
        },
        handler: async function (request, reply) {

            const id = request.params.id;

            const booksRepo = await getRepository(Book);
            const book = await booksRepo.findOneOrFail(id);
            console.log(book);
            
            // const book = await booksRepo.findOne(id);
            // later check if(!book)
            return reply.send(book);  
        }
    });


    // create
    fastify.route<{Body: BookBody}>({
        method: 'POST',
        url: '/books',
        schema: {
            body: bookSchema,
            // response: {200: bookSchema}
        },
        // preHandler: isUserAuthenticated,
        preValidation: isUserAuthenticated,
        handler: async function (request, reply): Promise<BookBody>{


            // const { title, author, genre, pages, realeaseYear, isbn, rating } = request.body;

            // const newBook: Book = {
            //const photo1 = new Photo();
            // photo1.url = "me.jpg";
            // photo1.user = user;
            // await connection.manager.save(photo1);

            const {userId} = request.session.user;

            // get user object
            const user = await getRepository(Users).findOne(userId);

            const book = await getRepository(Book).create({
                title: request.body.title,
                author: request.body.author,
                genre: Genres[request.body.genre],
                pages: request.body.pages,
                realeaseYear: request.body.realeaseYear,
                isbn: request.body.isbn,
                rating: <bookRating> request.body.rating,
                user: user
                
            });


            // const book = await getRepository(Book).create(newBook);
            await getRepository(Book).save(book);
            return reply.send(book);
            
        }
    });


    // update
    fastify.route<{Params: QueryId, Body: BookBody}>({
        method: 'PATCH',
        // method: 'PUT',
        url: '/books/:id',
        schema: {
            params: queryIdSchema,
            // response: {200: bookSchema}
        },
        handler: async function (request, reply){

            const id = request.params.id;
            const { title, author, genre, pages, realeaseYear, isbn, rating } = request.body;

            const booksRepo = await getRepository(Book);
            const book = await booksRepo.findOneOrFail(id);

            // if(book){}

            book.title = title;
            book.author = author;
            book.genre = <Genres> genre;
            book.pages = pages;
            book.realeaseYear = realeaseYear;
            book.isbn = isbn;
            book.rating = <bookRating> rating;

            const bookUpdate = await booksRepo.save(book);
            return reply.send(bookUpdate);  
        }
    });

    // delete
    fastify.route<{Params: QueryId}>({
        method: 'DELETE',
        url: '/books/:id',
        schema: {
            params: queryIdSchema,
            // response: {200: bookSchema}
        },
        handler: async function (request, reply) {
            const id = request.params.id;

            const booksRepo = await getRepository(Book);
            const book = await booksRepo.findOneOrFail(id);

            const bookDelete = await booksRepo.delete(id);
            return reply.send(bookDelete);  
        }
    });

    //TODO: get all books count then count per user
    


  
}
