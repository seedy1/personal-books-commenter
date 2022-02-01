import * as dotenv from "dotenv";

require('dotenv').config() 

// const hidden = process.env;
export interface ProcessEnv {
    [key: string]: string | undefined
}
export const SERVER_PORT = parseInt(process.env.PORT || '3000', 10);


// databse

export const DATABASE_NAME = getOrThrow("DATABASE_NAME");
export const TEST_DATABASE_NAME = getOrThrow("TEST_DATABASE_NAME");
export const DATABASE_USER = getOrThrow("DATABASE_USER");
export const DATABASE_PASSWORD = getOrThrow("DATABASE_PASSWORD");
export const DATABASE_PORT = parseInt(getOrThrow(("DATABASE_PORT") || '3307'), 10);
export const DATABASE_HOST = getOrThrow("DATABASE_HOST");

// password hashing
export const HASH_SALT = getOrThrow("BYCRYPT_SALT");


function getOrThrow(name: string) {
    const val = process.env[name]
    if (typeof val === 'undefined') throw new Error(`Missing mandatory environment variable ${name}`)
    return val
}


/**
 * Returns value stored in environment variable with the given `name`.
 * Throws Error if no such variable or if variable undefined; thus ensuring type-safety.
 * @param name - name of variable to fetch from this process's environment.
 */
 export function env(name: string): string {
    const value = process.env[name];
  
    if (!value) {
      throw new Error(`Missing: process.env['${name}'].`);
    }
  
    return value;
  }