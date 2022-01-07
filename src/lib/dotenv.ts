import * as dotenv from "dotenv";

require('dotenv').config() 

// const hidden = process.env;
export interface ProcessEnv {
    [key: string]: string | undefined
}
export const SERVER_PORT = parseInt(process.env.PORT || '3000', 10);


// databse

// export const DATABASE_NAME = String(process.env.DATABASE_NAME);
// export const DATABASE_USER = String(process.env.DATABASE_USER);
// export const DATABASE_PASSWORD = String(process.env.DATABASE_PASSWORD );
// export const DATABASE_PORT = parseInt(process.env.DATABASE_PORT || '3307', 10);
// export const DATABASE_HOST = String(process.env.DATABASE_HOST);

export const DATABASE_NAME = getOrThrow("DATABASE_NAME");
export const DATABASE_USER = getOrThrow("DATABASE_USER");
export const DATABASE_PASSWORD = getOrThrow("DATABASE_PASSWORD");
export const DATABASE_PORT = parseInt(getOrThrow(("DATABASE_PORT") || '3307'), 10);
export const DATABASE_HOST = getOrThrow("DATABASE_HOST");



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