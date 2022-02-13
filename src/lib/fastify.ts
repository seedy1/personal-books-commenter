import fastify from "fastify";
import { authRoutes } from "../routes/auth";
import { bookRoutes } from "../routes/book";
import { userRoutes } from "../routes/user";

import cookie, { fastifyCookie } from "fastify-cookie";
import session from "fastify-session";

import { SESSION_SECRET } from "./dotenv";

export const server = fastify({logger: true}) // remove logger for test. optionlly for me
.register(bookRoutes)
.register(authRoutes)
.register(userRoutes)
.register(fastifyCookie)
.register(session, {
    secret: SESSION_SECRET,
    saveUninitialized: false,
    cookie:{
        httpOnly: false, // should be true for prod
        secure: false 
    }
});
