import { FastifyInstance } from "fastify";
import { getRepository } from "typeorm";
import { isUserAuthenticated } from "../lib/isUserAuth";

import * as chaptersSchema from "../schemas/json/chapters.json";
import * as commentSchema from "../schemas/json/comment.json";
import * as queryIdSchema from "../schemas/json/queryId.json";
import * as doubleQueryIdSchema from "../schemas/json/twoPartQueryId.json";

import { TwoPartQueryId } from "../schemas/types/twoPartQueryId";
import { QueryId } from "../schemas/types/queryId";
import { Book } from "../models/Book";
import { Chapters } from "../models/Chapters";
import { Comments } from "../models/Comments";


export async function chaptersAndCommentsRoute(fastify: FastifyInstance){

    fastify.addHook("preHandler", isUserAuthenticated);
    fastify.addSchema(chaptersSchema);
    fastify.addSchema(commentSchema);
    fastify.addSchema(queryIdSchema);
    fastify.addSchema(doubleQueryIdSchema);


    // you can only add and delete chapters

    // add a chapter for a book
    fastify.route<{Params: QueryId, Body: Chapters}>({
        method: "POST",
        url: "/me/books/:id/chapters",
        schema: {
            params: queryIdSchema,
            body: chaptersSchema
        },
        handler: async function (request, reply) {

            const id = request.params.id; //current book id
            const currentBook = await getRepository(Book).findOne(id);

            const chapter = await getRepository(Chapters).create({
                chapter: request.body.chapter, // chapter is a number
                book: currentBook
            });

            await getRepository(Chapters).save(chapter);

            return reply.send({
                message: "New Chapter Added",
                success: true
            });
        }
    });


    // get all chapters a book has
    // TODO: move to book/:id
    fastify.route<{Params: TwoPartQueryId, Body: Comments}>({
        method: "POST",
        url: "/me/books/:bookId/chapters/:chapterId/comment",
        schema: {
            params: doubleQueryIdSchema,
            body: commentSchema
        },
        handler: async function (request, reply) {

            const bookId = request.params.bookId; //current book id
            const chapterId = request.params.chapterId; //current book id

            const currentChapter = await getRepository(Chapters).findOne(chapterId);

            const comment = await getRepository(Comments).create({
                comment: request.body.comment,
                chapter: currentChapter
            });

            await getRepository(Comments).save(comment);

            return reply.send({
                message: "New Comment Added",
                success: true
            });

        }
    });
    


}