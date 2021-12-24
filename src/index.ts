import Fastify from "fastify";


const fastify = Fastify({logger: true});
const PORT = 3000;

// Declare a route
// fastify.get()
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

const start = async () =>{
    try{
        await fastify.listen(PORT);
    }catch(err){

        fastify.log.error(err);
        process.exit(1);

    }
};


start().catch(console.error);