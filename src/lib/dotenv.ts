
// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-var-requires
require('dotenv').config()

export interface ProcessEnv {
    [key: string]: string | undefined
}

// fastify
export const SERVER_PORT = parseInt(process.env.PORT || '3000', 10);


// database
export const DATABASE_NAME = getOrThrow("DATABASE_NAME");
export const TEST_DATABASE_NAME = getOrThrow("TEST_DATABASE_NAME");
export const DATABASE_USER = getOrThrow("DATABASE_USER");
export const DATABASE_PASSWORD = getOrThrow("DATABASE_PASSWORD");
export const DATABASE_PORT = parseInt(getOrThrow(("DATABASE_PORT") || '3307'), 10);
export const DATABASE_HOST = getOrThrow("DATABASE_HOST");

// password hashing
export const HASH_SALT = getOrThrow("BYCRYPT_SALT");

// session and cookie
export const SESSION_SECRET = getOrThrow("SESSION_SECRET");


/**
 * returns value stored in .env file
 * @param name - name of variable to fetch from .env file
 * @retruns the value if present
 */
function getOrThrow(name: string) {
    const val = process.env[name]
    if (typeof val === 'undefined') throw new Error(`Missing mandatory environment variable ${name}`)
    return val
}

