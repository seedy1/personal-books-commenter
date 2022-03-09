import { createConnection, createConnections } from "typeorm";
import { Book } from "../models/Book";
import { Chapters } from "../models/Chapters";
import { Personas } from "../models/Personas";
import { Comments } from "../models/Comments";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER, TEST_DATABASE_NAME } from "./dotenv";
import { Users } from "../models/Users";


// export function
export function initConnection(){
    return createConnection({
        type: "mysql",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        entities: [Users, Book, Personas, Chapters, Comments],
        logging: true,
        synchronize: true
    })
}

export function TestInitConnection(){
    return createConnection({
        type: "mysql",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: TEST_DATABASE_NAME,
        entities: [Users, Book, Personas, Chapters, Comments],
        logging: true,
        synchronize: true
    })
}
