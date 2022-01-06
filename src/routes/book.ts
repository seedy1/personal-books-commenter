import Fastify, {FastifyInstance} from "fastify";

export async function bookRoute (fastify: FastifyInstance) {

    fastify.get('/book', async( req, reply) =>{
        return { books: 'return all users books' }
    })

    fastify.post('/book', async (req, reply) =>{
        return req.body; 
    });

    // fastify.post<{}>()
}
