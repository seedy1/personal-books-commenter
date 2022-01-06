import Fastify from "fastify";
import { initConnection } from "./lib/databaseConfig";
import {SERVER_PORT} from "./lib/dotenv";
import { bookRoute } from "./routes/book";

import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname+'/.env' });
require('dotenv').config() 

function getOrThrow(name: string) {
    const val = process.env[name]
    if (typeof val === 'undefined') throw new Error(`Missing mandatory environment variable ${name}`)
    return val
}

const fastify = Fastify({logger: true});

fastify.register(bookRoute);
// Declare a route
// fastify.get()    "mysql2": "^2.3.3-rc.0",
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

const start = async () =>{
    await initConnection();
    // console.log('see');
    // console.log(__dirname);
    // console.log('see');
    // console.log(getOrThrow("DATABASE_NAME"));
    
    try{
        await fastify.listen(SERVER_PORT);
    }catch(err){

        fastify.log.error(err);
        process.exit(1);

    }
};


start().catch(console.error);