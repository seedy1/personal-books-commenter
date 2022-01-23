import fastify from "fastify";
import { authRoutes } from "../routes/auth";
import { bookRoutes } from "../routes/book";
import { userRoutes } from "../routes/user";

export const server = fastify({logger: true}) // remove logger for test. optionlly for me
.register(bookRoutes)
.register(authRoutes)
.register(userRoutes);
