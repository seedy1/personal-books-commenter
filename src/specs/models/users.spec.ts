import { server } from "../../lib/fastify";
import { expect } from "chai";
import { it } from "mocha";

describe("User model", function(){
    describe("User register", function(){

        it("should failed a user registration when email and password are missing", async function(){

            const payload = {
                fullName: "name"
            };

            const reply = await server.inject({
                url: "register",
                method: "POST",
                payload: payload
            });

            expect(reply.statusCode).to.not.equal(200);
            expect(reply.statusCode).to.equal(400);

        });

        it("should register a new user", async function(){

            const payload = {
                fullName: "name full",
                email: "namw2@email.com",
                password: "pass2"
            };

            const reply = await server.inject({
                url: "register",
                method: "POST",
                payload: payload
            });

            expect(reply.statusCode).to.equal(200);

        });

    });

    describe("User login", function(){

        it("Should not be able to view user profile page", async function(){

            const reply = await server.inject({
                url: "me",
                method: "GET"
            });

            expect(reply.statusCode).to.not.equal(200);

        });

        it("should allow a user to login", async function(){

            //register
            const registerPayload = {
                fullName: "name",
                email: "name1@email.com",
                password: "pass1"
            };
            await server.inject({
                url: "register",
                method: "POST",
                payload: registerPayload
            });

            // sign in
            const payload = {
                email: "name1@email.com",
                password: "pass1"
            };

            const reply = await server.inject({
                url: "login",
                method: "POST",
                payload: payload
            });

            expect(reply.statusCode).to.equal(200);

        });

        it("should not allow user with wrong credentilas to login", async function(){

            //register
            const registerPayload = {
                fullName: "ss name",
                email: "name@sl.com",
                password: "cytvhj"
            };
            await server.inject({
                url: "register",
                method: "POST",
                payload: registerPayload
            });

            // sign in
            const payload = {
                email: "mistake@email.com",
                password: "joemama"
            };

            const reply = await server.inject({
                url: "login",
                method: "POST",
                payload: payload
            });

            expect(reply.json()).to.haveOwnProperty("success").equal(false);

        });
            
    });
});