import { initConnection } from "./lib/databaseConfig";
import {SERVER_PORT} from "./lib/dotenv";
import { server } from "./lib/fastify";

// test new PC push
//  wunna
const start = async () =>{
    
    await initConnection();
    await server.listen(SERVER_PORT);

};


start().catch(console.error);