import { server } from "../../lib/fastify";
import { expect } from "chai";


describe("User Books", function(){

    before("Register a user", async function(){

        const payload = {
            fullName: "J D",
            email: "jd@p.com",
            password: "123pass123"
        };

        await server.inject({
            url: "register",
            method: "POST",
            payload: payload
        });

    });

    describe("Private user routes and CRUD", function(){

        it("should get user profile route", async function(){
    
            // login
            const loginPayload = {
                email: "jd@p.com",
                password: "123pass123"
            };
    
            const login = await server.inject({
                url: "login",
                method: "POST",
                payload: loginPayload
            });

            const cookie = login.headers["set-cookie"];
            // const cookie:OutgoingHttpHeaders = getCookie();

            const reply = await server.inject({
                // cookies: session
                headers: {cookie},
                url: "me",
                method: "GET"
            });

            expect(reply.statusCode).to.equal(200);
            expect(reply.json()).to.haveOwnProperty('name').equal("J D");
            expect(reply.json()).to.haveOwnProperty('email').eq("jd@p.com");
            expect(reply.json()).to.not.haveOwnProperty('password');

        });


        it('should create a new book after logging in', async function(){

            // login
            const loginPayload = {
                email: "jd@p.com",
                password: "123pass123"
            };
    
            const login = await server.inject({
                url: "login",
                method: "POST",
                payload: loginPayload
            });

            const cookie = login.headers["set-cookie"];


            // const payload: BookBody = {
            const payload = {
                title: "book title",
                author: "string",
                realeaseYear: 1919,
                genre: "FICTION",
                pages: 50,
                isbn: "stg43ring",
                rating: "FIVE",
                // user: "",

            };
            // const reply = await;
            const reply = await server.inject({
                headers: {cookie},
                url: 'me/books',
                method: "POST",
                payload: payload
            });


            expect(reply.statusCode).to.equal(200);
            expect(reply.json()).to.haveOwnProperty('title');
            expect(reply.json()).to.haveOwnProperty('title').equal("book title");

        });

        it('should edit a newly created book', async function(){

            // login
            const loginPayload = {
                email: "jd@p.com",
                password: "123pass123"
            };
    
            const login = await server.inject({
                url: "login",
                method: "POST",
                payload: loginPayload
            });
            const cookie = login.headers["set-cookie"];

            const payload = {
                title: "book to edit",
                author: "string",
                realeaseYear: 1919,
                genre: "FICTION",
                pages: 50,
                isbn: "stg43ring",
                rating: "FIVE",

            };
            await server.inject({
                headers: {cookie},
                url: 'me/books',
                method: "POST",
                payload: payload
            });

            const updatePayload = {
                title: "updated title",
                realeaseYear: 2019
            };

            const reply = await server.inject({
                headers: {cookie},
                url: 'me/books/1',
                method: "PUT",
                payload: updatePayload

            });


            expect(reply.statusCode).to.equal(200);
            expect(reply.json()).to.haveOwnProperty('title').equal("updated title");
            expect(reply.json()).to.haveOwnProperty('realeaseYear').equal(2019);

        });

        
        it('should add a chapter to a newly created book', async function(){

            // login
            const loginPayload = {
                email: "jd@p.com",
                password: "123pass123"
            };
    
            const login = await server.inject({
                url: "login",
                method: "POST",
                payload: loginPayload
            });
            const cookie = login.headers["set-cookie"];

            const payload = {
                title: "bookie",
                author: "string",
                realeaseYear: 1919,
                genre: "FICTION",
                pages: 50,
                isbn: "stg43ring",
                rating: "FIVE",

            };
            await server.inject({
                headers: {cookie},
                url: 'me/books',
                method: "POST",
                payload: payload
            });

            const chapterPayload = {
                chapter: "1",
            };

            const reply = await server.inject({
                headers: {cookie},
                url: 'me/books/1/chapters',
                method: "POST",
                payload: chapterPayload

            });

            expect(reply.statusCode).to.equal(200);
            expect(reply.json()).to.haveOwnProperty("success").equal(true);
        });

        it('should add a persona to a newly created book', async function(){

            // login
            const loginPayload = {
                email: "jd@p.com",
                password: "123pass123"
            };
    
            const login = await server.inject({
                url: "login",
                method: "POST",
                payload: loginPayload
            });
            const cookie = login.headers["set-cookie"];

            const payload = {
                title: "bookie",
                author: "string",
                realeaseYear: 1919,
                genre: "FICTION",
                pages: 50,
                isbn: "stg43ring",
                rating: "FIVE",

            };
            await server.inject({
                headers: {cookie},
                url: 'me/books',
                method: "POST",
                payload: payload
            });

            const personaPayload = {
                characterName: "john doe",
            };

            const reply = await server.inject({
                headers: {cookie},
                url: 'me/books/1/personas',
                method: "POST",
                payload: personaPayload

            });

            expect(reply.statusCode).to.equal(200);
            expect(reply.json()).to.haveOwnProperty("success").equal(true);
        });

    });
});

