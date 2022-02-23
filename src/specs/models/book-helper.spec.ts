// TODO: later

/*

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

*/