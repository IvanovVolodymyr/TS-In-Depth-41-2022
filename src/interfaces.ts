import { Category } from './enums';

// Task 04.01 / 1.__________________________
interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    // Task 04.01 / 7.
    pages?: number;
    // markDamaged?: (reason: string) => void; /* First option - Book is property */
    // markDamaged? (reason: string): void; /* Second option - Book is method */
    markDamaged?: DamageLogger; /* Third option - is it Task 04.02 / 2. */
}

// Task 04.02 / 1.___________________________
interface DamageLogger {
    (reason: string): void;
}

// Task 04.03 / 1.___________________________
interface Person {
    name: string;
    email: string;
}

// Task 04.03 / 2.___________________________
interface Author extends Person {
    numBooksPublished: number;
}

// Task 04.03 / 3.___________________________
interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string, bookTitle: string) => void;
}

// Task 05.05 / 5.___________________________
interface TOptions {
    duration?: number;
    speed?: number;
}

// Task 07.02 / 1.___________________________
interface Magazine {
    title: string;
    publisher: string;
}

// Task 07.03 / 2.________________________
interface ShelfItem {
    title: string;
}

// Task 09.01 / 1. Callback Function____________
interface LibMgrCallback {
    (err: Error | null, titles: string[] | null): void;
}

// Task 09.01 / 2. Generic interface for Callback________
interface Callback<T> {
    (err: Error | null, data: T | null): void;
}

export {Author, LibMgrCallback, Callback, ShelfItem, Magazine, Book, Librarian, Person, TOptions, DamageLogger as Logger};