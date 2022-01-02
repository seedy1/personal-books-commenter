import { Schema, model, connect } from 'mongoose';

interface Book{ // refactor to get from generated schema

    name: string;
}

const bookSchema = new Schema<Book>({
    name: {type: String, required: true}
});

const BookModel = model<Book>('Book', bookSchema);
module.exports = model<Book>('Book', bookSchema);

// const UserModel = model<Book>('User', schema);
