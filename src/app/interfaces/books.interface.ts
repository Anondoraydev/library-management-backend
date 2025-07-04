import { Model } from "mongoose";

export interface IBook {
    title: string;
    author: string;
    image: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
    isbn: string;
    description?: string;
    copies: number;
    available?: boolean;
}

export interface IBookModel extends Model<IBook> {
    decreaseCopies(bookId: string, quantity: number): Promise<IBook>;
}