import { createConnection, Connection } from "typeorm";
import { Book } from "../models/Book";
import { Chapters } from "../models/Chapters";
import { Characters } from "../models/Characters";
import { Comments } from "../models/Comments";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "./dotenv";


// export function
export function initConnection(){
    return createConnection({
        type: "mysql",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        entities: [Book, Characters, Chapters, Comments],
        logging: true,
        synchronize: true
    })
};