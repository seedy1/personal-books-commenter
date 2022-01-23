import { FastifyInstance } from "fastify";
import { userInfo } from "os";
import { getRepository } from "typeorm";
import { Users } from "../models/Users";
import { User } from "../schemas/types/user";

import * as userSchema from "../schemas/json/user.json";
import { use } from "chai";


export async function authRoutes(fastify: FastifyInstance) {
    fastify.addSchema(userSchema);
    
    fastify.route<{Body: User}>({
        method: "POST",
        url: "/register",
        schema: {
            body: userSchema
        },
        handler: async function( request, reply): Promise<User>{

            // const newUser= getRepository(Users).create({
            const user = await getRepository(Users).create({
                fullName: request.body.fullName,
                email: request.body.email,
                password: request.body.password
            });

            await getRepository(Users).save(user);
            // const newUser= ({
            //     fullName: request.body.fullName,
            //     email: request.body.email,
            //     password: request.body.password
            // });
            return reply.send("Successfully registered");
            // return reply.send(user);

        }
    })
}