import { FastifyInstance } from "fastify";
import { getRepository } from "typeorm";
import { isUserAuthenticated } from "../lib/isUserAuth";

import * as personaSchema from "../schemas/json/persona.json";
import * as commentSchema from "../schemas/json/comment.json";
import * as queryIdSchema from "../schemas/json/queryId.json";
import * as doubleQueryIdSchema from "../schemas/json/twoPartQueryId.json";
import * as tripleQueryIdSchema from "../schemas/json/threePartQueryId.json";

import { TwoPartQueryId } from "../schemas/types/twoPartQueryId";
import { QueryId } from "../schemas/types/queryId";
import { Book } from "../models/Book";
import { Personas } from "../models/Personas";
import { Comments } from "../models/Comments";
import { ThreePartQueryId } from "../schemas/types/threePartQueryId";


export async function personasAndCommentsRoute(fastify: FastifyInstance){

    fastify.addHook("preHandler", isUserAuthenticated);
    fastify.addSchema(personaSchema);
    fastify.addSchema(commentSchema);
    fastify.addSchema(queryIdSchema);
    fastify.addSchema(doubleQueryIdSchema);
    fastify.addSchema(tripleQueryIdSchema);


    // add a persona to a book
    fastify.route<{Params: QueryId, Body: Personas}>({
        method: "POST",
        url: "/me/books/:id/personas",
        schema: {
            params: queryIdSchema,
            body: personaSchema,
            tags: ["private"]
        },
        handler: async function (request, reply) {

            // check if user owns this resource
            const {userId} = request.session.user;
            const id = request.params.id; //current book id
            const currentBook = await getRepository(Book).findOne(id,
                {
                    relations: ["user"]
                });

            if(currentBook!.user?.id !== userId){
                return reply.send({
                    message:"Not authorized.",
                    success: false
                });
            }

            const persona = getRepository(Personas).create({
                characterName: request.body.characterName,
                description: request.body.description,
                book: currentBook
            });

            await getRepository(Personas).save(persona);

            return reply.send({
                message: "New Character Persona Added",
                success: true
            });
        }
    });

    // edit persona without comments
    fastify.route<{Params: TwoPartQueryId, Body: Personas}>({
        method: "PUT",
        url: "/me/books/:bookId/personas/:id",
        schema: {
            params: doubleQueryIdSchema,
            tags: ["private"]
        },
        handler: async function(request, reply){

            // check if user owns this resource
            const {userId} = request.session.user;
            const bookId = request.params.bookId;

            const currentBook = await getRepository(Book).findOne(bookId,
                {
                    relations: ["user"]
                });

            if(currentBook!.user?.id !== userId){
                return reply.send({
                    message:"Not authorized.",
                    success: false
                });
            }


            const personaId = request.params.id;
            const {characterName, description} = request.body;

            const personasRepo = getRepository(Personas);
            const currentPersona = await personasRepo.findOneOrFail(personaId);

            currentPersona.characterName = characterName;
            currentPersona.description = description;
            
            await personasRepo.save(currentPersona);

            reply.send({
                message: "Persona Updated",
                success: true
            })


        }
    });


    // delete persona without any comments
    fastify.route<{Params: TwoPartQueryId}>({
        method: "DELETE",
        url: "/me/books/:bookId/personas/:id",
        schema: {
            params: doubleQueryIdSchema,
            tags: ["private"]
        },
        handler: async function(request, reply){

            const {userId} = request.session.user;
            const bookId = request.params.bookId;
            const currentBook = await getRepository(Book).findOne(bookId,
                {
                    relations: ["user"]
                });

            if(currentBook!.user?.id !== userId){
                return reply.send({
                    message:"Not authorized.",
                    success: false
                });
            }


            const personaId = request.params.id;
            const personasRepo = getRepository(Personas);
            const currentChapter = await personasRepo.findOneOrFail(personaId);
            await personasRepo.delete(personaId);
            
            return reply.send({
                message: "delete successful",
                success: true
            });


        }
    });



    // add a comment to a persona of a book
    fastify.route<{Params: TwoPartQueryId, Body: Comments}>({
        method: "POST",
        url: "/me/books/:bookId/personas/:id/comment",
        schema: {
            params: doubleQueryIdSchema,
            body: commentSchema,
            tags: ["private"]
        },
        handler: async function (request, reply) {

            const {userId} = request.session.user;
            const bookId = request.params.bookId;
            const currentBook = await getRepository(Book).findOne(bookId,
                {
                    relations: ["user"]
                });

            if(currentBook!.user?.id !== userId){
                return reply.send({
                    message:"Not authorized.",
                    success: false
                });
            }


            const personaId = request.params.id;
            const currentPersona = await getRepository(Personas).findOne(personaId);

            const comment = getRepository(Comments).create({
                comment: request.body.comment,
                persona: currentPersona
            });

            await getRepository(Comments).save(comment);

            return reply.send({
                message: "New Comment Added",
                success: true
            });

        }
    });
    

    // delete comment
    fastify.route<{Params: ThreePartQueryId}>({
        method: "DELETE",
        url: "/me/books/:bookId/personas/:id/comment/:commentId",
        schema: {
            params: tripleQueryIdSchema,
            tags: ["private"]
        },
        handler: async function (request, reply) {

            const {userId} = request.session.user;
            const bookId = request.params.bookId;
            const currentBook = await getRepository(Book).findOne(bookId,
                {
                    relations: ["user"]
                });

            if(currentBook!.user?.id !== userId){
                return reply.send({
                    message:"Not authorized.",
                    success: false
                });
            }
            

            const personaId = request.params.id;
            const commentId = request.params.commentId;
            const commentRepo = getRepository(Comments);

            const currentPersona = await getRepository(Personas).findOneOrFail(personaId);

            await commentRepo.delete(commentId);


            return reply.send({
                message: "Comment Deleted",
                success: true
            });

        }
    });

}