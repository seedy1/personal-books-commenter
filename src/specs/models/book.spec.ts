import {expect} from "chai";
import {getRepository} from "typeorm"
import { server } from "../../lib/fastify";
import {Book} from "../../models/Book";
import { BookBody } from "../../schemas/types/bookBody";

// unit validation test
describe('Books Model', function(){
    describe('# book model crud test', function(){
        
        it('should get 0 as book count on the first run', async function(){
            const bookCount = await getRepository(Book).count();
            expect(bookCount).to.equal(0);
        });

        it('should GET books/', async function(){
            const reply = await server.inject({
                url: 'books',
                method: "GET"
            });
            console.log(reply.statusCode);
            
            // const bookCount = await getRepository(Book).count();
            expect(reply.statusCode).to.equal(200);
        });

        it('should return page not found 404', async function(){
            const reply = await server.inject({
                url: 'http://localhost:3000/booksa',
                method: "GET"
            });
            // const bookCount = await getRepository(Book).count();
            expect(reply.statusCode).to.equal(404);
            expect(reply.statusCode).to.not.equal(200);
        });

        it('should create a new book', async function(){

            const payload: BookBody = {
                title: "book title",
                author: "string",
                realeaseYear: 1919,
                genre: "FICTION",
                pages: 50,
                isbn: "stg43ring",
                rating: "FIVE",

            };
            // const reply = await;
            const reply = await server.inject({
                url: 'books',
                method: "POST",
                payload: payload
            });

            // res.body.should.have.property('message').eql('Book updated!');

            expect(reply.statusCode).to.equal(200);
            expect(reply.json()).to.haveOwnProperty('title');
            expect(reply.json()).to.haveOwnProperty('title').equal("book title");


        });

        it('should return 1 after adding the first book', async function(){
            const bookCount = await getRepository(Book).count();
            expect(bookCount).to.equal(1);
        });

        it('edit the newly craeted book title', async function(){

            const payload: BookBody = {
                title: "book title updated",
                author: "string",
                realeaseYear: 1919,
                genre: "FICTION",
                pages: 50,
                isbn: "stg43ring",
                rating: "FIVE",

            };
            // const reply = await;
            const reply = await server.inject({
                url: 'books/1',
                method: "PATCH",
                payload: payload

            });

            expect(reply.statusCode).to.equal(200);
            expect(reply.json()).to.haveOwnProperty('title');
            expect(reply.json()).to.haveOwnProperty('title').eq("book title updated");

        });

        // TODO: delete book



    });

});


