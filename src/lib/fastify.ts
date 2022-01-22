import fastify from "fastify";
import { bookRoutes } from "../routes/book";

export const server = fastify({logger: true}) // remove logger for test. optionlly for me
.register(bookRoutes);
