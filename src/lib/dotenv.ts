import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

export const SERVER_PORT = parseInt(process.env.PORT || '8080', 10);
export const DB_CONNECTION = String(process.env.MONGO_CONNECTION);
