import { createConnection, createConnections } from "typeorm";
import { Book } from "../models/Book";
import { Chapters } from "../models/Chapters";
import { Characters } from "../models/Characters";
import { Comments } from "../models/Comments";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER, TEST_DATABASE_NAME } from "./dotenv";


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

export function TestInitConnection(){
    return createConnection({
        type: "mysql",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: TEST_DATABASE_NAME,
        entities: [Book, Characters, Chapters, Comments],
        logging: true,
        synchronize: true
    })
};

export const connections = createConnections([{
    name: "devDB",
    type: "mysql",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    entities: [Book, Characters, Chapters, Comments],
    synchronize: true,
    logging: true
}, {
    name: "testDB",
    type: "mysql",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: TEST_DATABASE_NAME,
    entities: [Book, Characters, Chapters, Comments],
    synchronize: true,
    logging: true
}]);