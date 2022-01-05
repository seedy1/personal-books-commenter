import Fastify from "fastify";
import {SERVER_PORT} from "./lib/dotenv";


const fastify = Fastify({logger: true});


// Declare a route
// fastify.get()
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

const start = async () =>{
    try{
        await fastify.listen(SERVER_PORT);
    }catch(err){

        fastify.log.error(err);
        process.exit(1);

    }
};


start().catch(console.error);