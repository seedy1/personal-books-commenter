import Fastify from "fastify";
import { createConnection, getConnection } from "typeorm";
import { connections, initConnection } from "./lib/databaseConfig";
import {SERVER_PORT} from "./lib/dotenv";
import { bookRoutes } from "./routes/book";
// import * as bookSchema  from "./schemas/json/bookBody.json";

// import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname+'/.env' });
// require('dotenv').config() 

function getOrThrow(name: string) {
    const val = process.env[name]
    if (typeof val === 'undefined') throw new Error(`Missing mandatory environment variable ${name}`)
    return val
}

const fastify = Fastify({logger: true});

fastify.register(bookRoutes);

fastify.get('/:id', async (request, reply) => {
    return { hello: request.params }
  })

const start = async () =>{
    
    await initConnection();
    // await connections("devDB");
    
    // await createConnection("devDB");
    // const dbDev = await getConnection("devDB");
    try{
        await fastify.listen(SERVER_PORT);
    }catch(err){

        fastify.log.error(err);
        process.exit(1);

    }
};


start().catch(console.error);