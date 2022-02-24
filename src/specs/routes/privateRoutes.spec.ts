import { server } from "../../lib/fastify";
import { expect } from "chai";

describe("Private routes", function(){
    describe('authroized and unathenticated users', function(){
       
        it("should not be able to see private books route", async function(){

            const reply = await server.inject({
                url: "me/books",
                method: "GET",
            });

            expect(reply.statusCode).to.not.equal(200);
            expect(reply.statusCode).to.equal(500);

        });


        it("should not be able to see private books route", async function(){

            const reply = await server.inject({
                url: "me/books/1",
                method: "GET",
            });

            expect(reply.statusCode).to.not.equal(200);
            expect(reply.statusCode).to.equal(500);

        });

    });

});