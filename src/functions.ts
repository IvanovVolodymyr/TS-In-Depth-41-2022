/* eslint-disable no-redeclare */

import { Category } from './enums';
import { Book, Callback, LibMgrCallback, TOptions } from './interfaces';
import { BookOrUndefin, BookProperties } from './types';
import RefBook from './classes/encyclopedia';

export function getAllBooks(): readonly Book[] {
    const books = <const>[
        { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true },
        { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
    ];

    return books;
}
// Task 02.01 / 2.___________________________
export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books: ${books.length}`);

    const title = books.find(book => book.available === true).title;
    console.log(`First available book: ${title}`);
}

// Task 02.01 / 6.___________________________
export function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
    const books = getAllBooks();

    return books
        .filter(book => book.category === inputCategory) /* Posible Destructurisetion to: .filter(({ category }) => category === inputCategory) */
        .map(book => book.title);  /* Posible Destructurisetion to: .map(({ title }) => title); */
}

// Task 02.01 / 7.___________________________
export function logBookTitles(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}

// Task 02.01 / 8.___________________________
export function getBookAuthorByIndex(index: number): [title: string, author: string] {   /* Task 02.01 / 9. - добавили мітки title: and author: до string, string */
    const books = getAllBooks();

    const { title, author } = books[index];
    return [title, author];
}

// Task 02.01 / 10.___________________________
export function calcTotalPages(): void {
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];

    const r = data.reduce((acc: bigint, obj) => {
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n);

    console.log(r);
}

// Task 03.01 / 1.___________________________
export function createCustomerID(name: string, id: number): string {
    return `${id}/${name}`;
}

// Task 03.02 / 1.___________________________
export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);

    if (age) {
        console.log(`Customer age: ${age}`);
    }

    if (city) {
        console.log(`Customer city: ${city}`);
    }
}

// Task 03.02 / 4. and Task 05.05 / 4.______________________
export function getBookByID(id: Book['id']): BookOrUndefin {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

// Task 03.02 / 5.___________________________
export function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer name: ${customer}`);

    return bookIDs
        .map(id => getBookByID(id))
        .filter(book => book.available)
        .map(book => book.title);
}

// Task 03.03 / 2.__Overloaded Function________
export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
    const books = getAllBooks();

    if (args.length === 1) {
        const [arg] = args;

        if (typeof arg === 'string') {
            return books.filter(book => book.author === arg).map(book => book.title);
        } else if (typeof arg === 'boolean') {
            return books.filter(book => book.available === arg).map(book => book.title);
        }

    } else if (args.length === 2) {
        const [id, available] = args;

        if (typeof id === 'number' && typeof available === 'boolean') {
            return books.filter(book => book.id === id && book.available === available).map(book => book.title);
        }
    }
}

// Task 03.04 / 1.__________________________
export function assertStringValue(data: any): asserts data is string {
    if (typeof data !== 'string') {
        throw new Error('value should have been a string');
    }
}

// Task 06.03 / 4.__________________________
export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not an instance of RefBook');
    }
}

// Task 03.04 / 2.__________________________
export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join('');
}

// Task 04.01 / 4.__________________________
export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

// Task 04.05 / 2.___________________________
export function getProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];

    return typeof value === 'function' ? value.name : value;
}

// Task 07/03 / 6.___________________________
export function getObjectProperty<TObject, TKey extends keyof TObject>(obj: TObject, prop: TKey): TObject[TKey] | string {
    const value = obj[prop];

    return typeof value === 'function' ? value.name : value;
}

// Task 05.05 / 5.___________________________
export function setDefaultConf(options: TOptions) {
    options.duration ??= 100;
    options.speed ??= 60;
    return options;
}

// Task 06.03 / 5.__________________________
export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

// Task 07.01 / 1.__________________________
export function purge<T>(inventory: Array<T>): T[] {
    return inventory.slice(2);
}

// Task 09.01 / 3. Callback Function____________
// // Option 1
// export function getBooksByCategory(category: Category, callback: LibMgrCallback): void {
// Option 2
export function getBooksByCategory(category: Category, callback: Callback<string[]>): void {
    // Task 09.01 / 4. ____________
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);

            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found');
            }
        } catch (error) {
            callback(error, null);
        }
    }, 2000);
}

// Task 09.01 / 5. _______________________
export function logCategorySearch(err: Error | null, titles: string[] | null): void {
    if (err) {
        console.log(err.message);
    } else {
        console.log(titles);
    }
}

// Task 09.02 / 1.-2. Promises_______________________
export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    const p: Promise<string[]> = new Promise((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);

            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No books found');
            }
        }, 2000);
    });

    return p;
}

// Task 09.03 / 1. Async Functions _________________
export async function logSearchResults(category: Category) {
    const titles = await getBooksByCategoryPromise(category);
    console.log(titles.length);
    return Promise.resolve(titles);

    // await Promise.all([p1, p2, p3])
}