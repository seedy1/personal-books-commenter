import { FastifyInstance } from "fastify";
import { getRepository } from "typeorm";
import { isUserAuthenticated } from "../lib/isUserAuth";

import * as chaptersSchema from "../schemas/json/chapters.json";
import * as commentSchema from "../schemas/json/comment.json";
import * as queryIdSchema from "../schemas/json/queryId.json";
import * as doubleQueryIdSchema from "../schemas/json/twoPartQueryId.json";
import * as tripleQueryIdSchema from "../schemas/json/threePartQueryId.json";

import { ThreePartQueryId } from "../schemas/types/threePartQueryId";
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
    fastify.addSchema(tripleQueryIdSchema);


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
                description: request.body.description,
                book: currentBook
            });

            await getRepository(Chapters).save(chapter);

            return reply.send({
                message: "New Chapter Added",
                success: true
            });
        }
    });

    // edit chapter without comments
    fastify.route<{Params: TwoPartQueryId, Body: Chapters}>({
        method: "PUT",
        url: "/me/books/:bookId/chapters/:id",
        schema: {
            params: doubleQueryIdSchema
        },
        handler: async function(request, reply){

            const bookId = request.params.bookId;
            const chapterId = request.params.id;
            const {userId} = request.session.user;
            const {chapter, description} = request.body;

            const chaptersRepo = getRepository(Chapters);
            const currentChapter = await chaptersRepo.findOneOrFail(chapterId);

            currentChapter.chapter = chapter;
            currentChapter.description = description;
            
            await chaptersRepo.save(currentChapter);

            reply.send({
                message: "Chapter Updated",
                success: true
            })


        }
    });

    // delete chapter without comments
    fastify.route<{Params: TwoPartQueryId}>({
        method: "DELETE",
        url: "/me/books/:bookId/chapters/:id",
        schema: {
            params: doubleQueryIdSchema
        },
        handler: async function(request, reply){

            const bookId = request.params.bookId;
            const chapterId = request.params.id;

            const chaptersRepo = getRepository(Chapters);
            const currentChapter = await chaptersRepo.findOneOrFail(chapterId);
            await chaptersRepo.delete(chapterId);
            
            return reply.send({
                message: "delete successful",
                success: true
            });


        }
    });



    // CAN ONLY POST AND DELETE COMMENTS

    // get all chapters a book has
    // TODO: move to book/:id
    // TODO: handle unique error
    fastify.route<{Params: TwoPartQueryId, Body: Comments}>({
        method: "POST",
        url: "/me/books/:bookId/chapters/:id/comment",
        schema: {
            params: doubleQueryIdSchema,
            body: commentSchema
        },
        handler: async function (request, reply) {

            const bookId = request.params.bookId; //current book id
            const chapterId = request.params.id;

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


    // delete comment
    fastify.route<{Params: ThreePartQueryId}>({
        method: "DELETE",
        url: "/me/books/:bookId/chapters/:id/comment/:commentId",
        schema: {
            params: tripleQueryIdSchema,
        },
        handler: async function (request, reply) {

            const bookId = request.params.bookId; //current book id
            const chapterId = request.params.id;
            const commentId = request.params.commentId;

            const commentRepo = await getRepository(Comments);

            const currentChapter = await getRepository(Chapters).findOneOrFail(chapterId);

            await commentRepo.delete(commentId);


            return reply.send({
                message: "Comment Deleted",
                success: true
            });

        }
    });

    


}