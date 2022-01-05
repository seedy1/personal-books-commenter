import { Schema, model, connect } from 'mongoose';

interface Book{ // refactor to get from generated schema
    title: string;
    author: string;
    year: string;
    genre: string;
    pages: number;
    isbn: string;
}

const bookSchema = new Schema<Book>({
    title: {type: String, required: true},
    author: {type: String, required: true},
    year: {type: String, required: true},
    genre: {type: String, required: true},
    pages: {type: Number, required: true},
    isbn: {type: String, required: true}
});

const BookModel = model<Book>('Book', bookSchema);
// module.exports = BookModel;
export default BookModel;