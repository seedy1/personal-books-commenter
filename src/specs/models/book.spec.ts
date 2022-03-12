import {expect} from "chai";
import {getRepository} from "typeorm"
import { server } from "../../lib/fastify";
import {Book} from "../../models/Book";


// unit validation test
describe('Books Model', function(){
    describe('book model public routes', function(){
        
        it('should get 0 as book count on the first run', async function(){
            const bookCount = await getRepository(Book).count();
            expect(bookCount).to.equal(0);
        });

        it('should GET books/', async function(){
            const reply = await server.inject({
                url: 'books',
                method: "GET"
            });
            
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

        it('should return page success false', async function(){
            const reply = await server.inject({
                url: 'http://localhost:3000/books/1',
                method: "GET"
            });
            expect(reply.json()).to.haveOwnProperty("success");
            expect(reply.json()).to.haveOwnProperty("success").equal(false);
        });


    });

});


