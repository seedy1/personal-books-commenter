import { FastifyInstance } from "fastify";
import { getRepository } from "typeorm";
import { Users } from "../models/Users";
import { User } from "../schemas/types/user";
import { Login } from "../schemas/types/login";

import * as userSchema from "../schemas/json/user.json";
import * as loginSchema from "../schemas/json/login.json";


export async function authRoutes(fastify: FastifyInstance) {
    fastify.addSchema(userSchema);
    fastify.addSchema(loginSchema);
    
    // register a new user
    fastify.route<{Body: User}>({
        method: "POST",
        url: "/register",
        schema: {
            body: userSchema
        },
        handler: async function(request, reply): Promise<User>{

            // use findBy to confrim email doesnt exsit  
            // handled by typeorm

            const user = await getRepository(Users).create({
                fullName: request.body.fullName,
                email: request.body.email,
                password: request.body.password
            });

            await getRepository(Users).save(user);
       
            return reply.send("Successfully registered");

        }
    });

    // login and assign session cookie
    fastify.route<{Body: Login}>({
        method: "POST",
        url: "/login",
        schema: {
            body: loginSchema
        },
        handler: async function(request, reply): Promise<Login>{

            const {email, password} = request.body;
            
            const userRepo = await getRepository(Users);
            // const _user = await userRepo.findOneOrFail({email});
            const _user = await userRepo.findOne({email});

            // check email
            if(_user == null){
                return reply.send("Wrong credentials...");
            }

            // check password
            
            if( !(await _user.checkPassword(password)) ){
                return reply.send("Wrong credentials...");    
            }

            return reply.send("login route - passowrd matched");

        }
    });
}