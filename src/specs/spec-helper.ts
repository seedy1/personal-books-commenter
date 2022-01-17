import { TestInitConnection } from "../lib/databaseConfig";
import BookModel from "../models/Book-old";


before(async function() {
  await console.log("setting up db");
  // await dbSetup();
  await TestInitConnection();
  await console.log("db setup done");
});



// beforeEach(function() {
//   // runs before each test in this block
//   console.log("setting up db - before each");
//   dbSetup();
//   console.log("db setup done - before each");
// });

async function dbSetup(): Promise<void> {
    // console.log("ran");
    
  // await connect(DB_CONNECTION);

  const _book =  await BookModel.create({
    title: "string",
    author: "string",
    year: "string",
    genre: "string",
    pages: "number",
    isbn: "string",
    created_at: "11"
  });


  // await _book.save();
  await console.log(_book);
  
  await console.log('Book saved!');

};

async function clearDB(): Promise<void> {
  // 4. Connect to MongoDB

  // await (await connect(DB_CONNECTION)).Collection.drop();

};

