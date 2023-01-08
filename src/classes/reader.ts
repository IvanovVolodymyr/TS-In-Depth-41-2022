import { Book } from '../interfaces';

// Task 06.05 / 1.___________________________
export class Reader {
    name: string;
    books: Book[] = [];

    take(book: Book): void {
        this.books.push(book);
    }
}