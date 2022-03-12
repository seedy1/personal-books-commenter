import fastify from "fastify";
import { authRoutes } from "../routes/auth";
import { bookRoutes } from "../routes/book";
import { userRoutes } from "../routes/user";
import { chaptersAndCommentsRoute } from "../routes/chaptersAndComments";
import { personasAndCommentsRoute } from "../routes/personasAndComments";

import { fastifyCookie } from "fastify-cookie";
import session from "fastify-session";

import { SESSION_SECRET } from "./dotenv";

import fastifySwagger from "fastify-swagger";
import { swaggerDocs } from "./swaggerDoc";
import { UnauthorizedError } from "./isUserAuth";


export const server = fastify({logger: false}) // set logger to false for prod. optionlly for me
.register(fastifySwagger, swaggerDocs)
.register(authRoutes)
.register(bookRoutes)
.register(userRoutes)
.register(chaptersAndCommentsRoute)
.register(personasAndCommentsRoute)
.register(fastifyCookie)
.register(session, {
    secret: SESSION_SECRET,
    saveUninitialized: false,
    cookie:{
        httpOnly: false, // should be true for prod
        secure: false 
    }
})
.setErrorHandler((err, request, reply) =>{
    if(err instanceof UnauthorizedError){
        void reply.status(422).send(err);
    }else if( reply.statusCode < 500 ){
        reply.log.info({res: reply, err: err}, err?.message);
        void reply.send(err);
    }else if( err.message === "Must be signed in." && reply.statusCode == 500){
        reply.log.info({res: reply, err: err}, err?.message);
        void reply.send(err);
    }else if( err.code ==="ER_DUP_ENTRY" && reply.statusCode == 500){
        reply.log.info({res: reply, err: err}, err?.message);
        void reply.send(new Error("Duplicates are not allowed"));
    }else{
        reply.log.error({req: request, res: reply, err: err}, err?.message);
        void reply.send(new Error("Internal Server Error."));
    }
})
;
