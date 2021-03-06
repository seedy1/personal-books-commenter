import { FastifyInstance } from "fastify";
import { getRepository } from "typeorm";
import { Users } from "../models/Users";
import { User } from "../schemas/types/user";
import { Login } from "../schemas/types/login";

import * as userSchema from "../schemas/json/user.json";
import * as loginSchema from "../schemas/json/login.json";
import { isUserAuthenticated } from "../lib/isUserAuth";


export async function authRoutes(fastify: FastifyInstance){

    fastify.addSchema(userSchema);
    fastify.addSchema(loginSchema);
    
    
    // register a new user
    fastify.route<{Body: User}>({
        method: "POST",
        url: "/register",
        schema: {
            tags: ["auth", "public"],
            body: userSchema
        },
        handler: async function(request, reply): Promise<User>{

            // use findBy to confirm email doesnt exsit  
            // handled by typeorm

            const user = getRepository(Users).create({
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
            tags: ["auth", "public"],
            body: loginSchema
        },
        handler: async function(request, reply): Promise<Login>{

            const {email, password} = request.body;
            
            const userRepo = getRepository(Users);
            const user = await userRepo.findOne({email});

            // check email
            if(user == null || user == undefined){
                return reply.send({
                    message: "Wrong credentials...",
                    success: false
                });
            }

            // check password
            if( !(await user.checkPassword(password)) ){
                return reply.send({
                    message: "Wrong credentials...",
                    success: false
                });
            }

            // set session
            // request.session.user = {userID: _user.id};
            request.session.user = {userId: user.id, isUserAuthenticated: true}

            return reply.send({
                message: "login sucessful",
                success: true
            });

        }
    });


    // logout and delete session
    fastify.route({
        method: "GET",
        url: "/logout",
        schema:{
            tags: ["auth", "private"]
        },
        preHandler: isUserAuthenticated,
        handler: async function(request, reply){

            request.session.user = null;
            return reply.send("successfully logged out");

        }
    });

}