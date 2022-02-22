import { FastifyInstance } from "fastify";
import { getRepository } from "typeorm";
import { isUserAuthenticated } from "../lib/isUserAuth";
import { Book } from "../models/Book";
import { Users } from "../models/Users";

import * as bookSchema  from "../schemas/json/bookBody.json";

import * as queryIdSchema from "../schemas/json/queryId.json";
import { BookBody } from "../schemas/types/bookBody";
import { QueryId } from "../schemas/types/queryId";
import { bookRating, Genres } from "../shared/constants";


export async function userRoutes(fastify: FastifyInstance){
    fastify.addSchema(bookSchema);


    // TODO: add hook for prevalidation

    // get current user info akak just email
    fastify.route({
        method: "GET",
        url: "/me",
        preValidation: isUserAuthenticated,
        handler: async function(request, reply){
            
            // TODO: handle no session set error
            const {userId} = request.session.user;

            if(userId == undefined){
                reply.send("You must be logged in");
            }

            // console.log("USER ID: "+userId);
            
            const userRepo = await getRepository(Users);
            const user = await userRepo.findOne(userId);

            return reply.send({name: user?.fullName, email: user?.email, memberSince: user?.createdAt});

        }
    });

    // get current user book list
    fastify.route({
        method: "GET",
        url: "/me/books",
        preValidation: isUserAuthenticated,
        handler: async function(request, reply){
            
            // TODO: handle no session set error
            const {userId} = request.session.user;

            const booksRepo = await getRepository(Book);
            const userBooks = await booksRepo.find({ relations: ["user"], where: {user: {id: userId}}, order: {id: "DESC"}});
            return reply.send(userBooks);

        }
    });

    // get single book id, make sure its the current user resource
    // current user id == book.user.id
    fastify.route<{Params: QueryId}>({
        method: 'GET',
        url: '/me/books/:id',
        schema: {
            params: queryIdSchema,
            // response: {200: bookSchema}
        },
        handler: async function (request, reply) {

            const id = request.params.id;

            const booksRepo = await getRepository(Book);
            const book = await booksRepo.findOneOrFail(id);  
          
            return reply.send(book);  
        }
    });



    // create
    fastify.route<{Body: BookBody}>({
        method: 'POST',
        url: '/me/books',
        schema: {
            body: bookSchema,
            // response: {200: bookSchema}
        },
        // preHandler: isUserAuthenticated,
        preValidation: isUserAuthenticated,
        handler: async function (request, reply): Promise<BookBody>{


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
        url: '/me/books/:id',
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
        url: '/me/book/:id',
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