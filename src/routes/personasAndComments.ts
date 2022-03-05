import { FastifyInstance } from "fastify";
import { getRepository } from "typeorm";
import { isUserAuthenticated } from "../lib/isUserAuth";

import * as personaSchema from "../schemas/json/persona.json";
import * as commentSchema from "../schemas/json/comment.json";
import * as queryIdSchema from "../schemas/json/queryId.json";
import * as doubleQueryIdSchema from "../schemas/json/twoPartQueryId.json";

import { TwoPartQueryId } from "../schemas/types/twoPartQueryId";
import { QueryId } from "../schemas/types/queryId";
import { Book } from "../models/Book";
import { Personas } from "../models/Personas";
import { Comments } from "../models/Comments";


export async function personasAndCommentsRoute(fastify: FastifyInstance){

    fastify.addHook("preHandler", isUserAuthenticated);
    fastify.addSchema(personaSchema);
    fastify.addSchema(commentSchema);
    fastify.addSchema(queryIdSchema);
    fastify.addSchema(doubleQueryIdSchema);


    // add a persona to a book
    fastify.route<{Params: QueryId, Body: Personas}>({
        method: "POST",
        url: "/me/books/:id/personas",
        schema: {
            params: queryIdSchema,
            body: personaSchema
        },
        handler: async function (request, reply) {

            const id = request.params.id; //current book id
            const currentBook = await getRepository(Book).findOne(id);

            const persona = await getRepository(Personas).create({
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


    // add a comment to a persona of a book
    fastify.route<{Params: TwoPartQueryId, Body: Comments}>({
        method: "POST",
        url: "/me/books/:bookId/personas/:id/comment",
        schema: {
            params: doubleQueryIdSchema,
            body: commentSchema
        },
        handler: async function (request, reply) {

            const bookId = request.params.bookId; //current book id
            const personaId = request.params.id;

            const currentPersona = await getRepository(Personas).findOne(personaId);

            const comment = await getRepository(Comments).create({
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
    


}