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

    fastify.addHook("preHandler", isUserAuthenticated);
    fastify.addSchema(bookSchema);


// get user profile
    fastify.route({
        method: "GET",
        url: "/me",
        schema: {
            tags: ["private"]
        },
        handler: async function(request, reply){
            
            // TODO: handle no session set error
            const {userId} = request.session.user;

            if(userId == undefined){
                reply.send("You must be logged in");
            }
            
            const userRepo = getRepository(Users);
            const user = await userRepo.findOne(userId);

            return reply.send({name: user?.fullName, email: user?.email, memberSince: user?.createdAt});

        }
    });

    // get current user book list
    fastify.route({
        method: "GET",
        url: "/me/books",
        schema:{
            tags: ["private", "book"],
        },
        handler: async function(request, reply){
            
            const {userId} = request.session.user;

            const booksRepo = getRepository(Book);
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
            tags: ["private", "book"]
        },
        handler: async function (request, reply) {

            const bookId = request.params.id;
            const {userId} = request.session.user;


            const booksRepo = getRepository(Book);
            const userBook = await booksRepo.findOneOrFail(bookId,
                {
                relations: ["user", "chapters", "chapters.comments", "personas", "personas.comments"],
                // where: {user: {id: userId}},
            });


            if(userBook.user?.id === userId){
                return reply.send(userBook);  
            }else{
                reply.send("Not authorized.");
            }
          
        }
    });



    // create
    fastify.route<{Body: BookBody}>({
        method: 'POST',
        url: '/me/books',
        schema: {
            body: bookSchema,
            tags: ["book", "private"]
        },
        handler: async function (request, reply): Promise<BookBody>{


            const {userId} = request.session.user;

            // get user object
            const user = await getRepository(Users).findOne(userId);

            const book = getRepository(Book).create({
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


    // update - PUT
    fastify.route<{Params: QueryId, Body: BookBody}>({
        method: 'PUT',
        url: '/me/books/:id',
        schema: {
            params: queryIdSchema,
            tags: ["book", "private"]
        },
        handler: async function (request, reply){

            const id = request.params.id;
            const { title, author, genre, pages, realeaseYear, isbn, rating } = request.body;

            
            // get user object
            const {userId} = request.session.user;

            const booksRepo = await getRepository(Book);

            const book = await booksRepo.findOneOrFail(id,
                {
                relations: ["user"],
            });

            if(book.user?.id === userId){ // checking if user is authorized

                book.title = title;
                book.author = author;
                book.genre = <Genres> genre;
                book.pages = pages;
                book.realeaseYear = realeaseYear;
                book.isbn = isbn;
                book.rating = <bookRating> rating;

                const bookUpdate = await booksRepo.save(book);
                return reply.send(bookUpdate);

            }else{
                reply.send("not aut...");
            }

        }
    });


    // delete
    fastify.route<{Params: QueryId}>({
        method: 'DELETE',
        url: '/me/books/:id',
        schema: {
            params: queryIdSchema,
            tags: ["book", "private"]
        },
        handler: async function (request, reply) {
            const id = request.params.id;

             // get user object
             const {userId} = request.session.user;

             const booksRepo = getRepository(Book);

             // check if book exist
             const book = await booksRepo.findOneOrFail(id,
                 {
                 relations: ["user"],
             });

         
            if(book.user?.id === userId){
                await booksRepo.delete(id);
                return reply.send({
                        message: "delete successful",
                        success: true
                    });
            }else{
                reply.send({
                    message: "not aut...",
                    success: false
                });
            }

        }
    });

    //TODO: get all books count then count per user
    // findAndCount
    
    

}