import { ReferenceItem, UL, RefBook, Shelf } from './classes';
import { Category } from './enums';
import { purge, printRefBook, calcTotalPages, getAllBooks, getObjectProperty, getBookAuthorByIndex, getBookTitlesByCategory, logBookTitles, logFirstAvailable, createCustomer, getBooksByCategory, logCategorySearch, getBooksByCategoryPromise, logSearchResults } from './functions';
import { Book, Librarian, Logger, TOptions, Magazine } from './interfaces';
import Refbook from './classes/encyclopedia';
import { Library } from './classes/library';
import { BookRequiredFields, UpdatedBook, СreateCustomerFunctionType } from './types';


showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}
// __________________________________________

// Task 02.01 / 5.________________________________________

// enum Category { JavaScript, CSS, HTML, TypeScript, Angular}

// // Task 02.01 / 1.________________________________________
// // type Book = {
// //     id: number;
// //     title: string;
// //     author: string;
// //     available: boolean;
// //     category: Category;
// // };

// // Task 04.05 / 1.___________________________
// type BookProperties = keyof Book; // | 'isbn';

// // Task 05.05 / 1.___________________________
// type PersonBook = Person & Book;

// // Task 05.05 / 3.___________________________
// type BookOrUndefin = Book | undefined;

// // Task 04.01 / 1.__________________________
// interface Book {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
//     // Task 04.01 / 7.
//     pages?: number;
//     // markDamaged?: (reason: string) => void; /* First option - Book is property */
//     // markDamaged? (reason: string): void; /* Second option - Book is method */
//     markDamaged?: DamageLogger; /* Third option - is it Task 04.02 / 2. */
// }

// // Task 04.02 / 1.___________________________
// interface DamageLogger {
//     (reason: string): void;
// }

// // Task 04.03 / 1.___________________________
// interface Person {
//     name: string;
//     email: string;
// }

// // Task 04.03 / 2.___________________________
// interface Author extends Person {
//     numBooksPublished: number;
// }

// // Task 04.03 / 3.___________________________
// interface Librarian extends Person {
//     department: string;
//     assistCustomer: (custName: string, bookTitle: string) => void;
// }

// // Task 05.05 / 5.___________________________
// interface TOptions {
//     duration?: number;
//     speed?: number;
// }

// function getAllBooks(): readonly Book[] {
//     const books = <const>[
//         { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true},
//         { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
//         { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
//         { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
//     ];

//     return books;
// }
// // Task 02.01 / 2.___________________________
// function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
//     console.log(`Number of books: ${books.length}`);

//     const title = books.find(book => book.available === true).title;
//     console.log(`First available book: ${title}`);
// }

// // Task 02.01 / 6.___________________________
// function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
//     const books = getAllBooks();

//     return books
//         .filter(book => book.category === inputCategory) /* Posible Destructurisetion to: .filter(({ category }) => category === inputCategory) */
//         .map(book => book.title);  /* Posible Destructurisetion to: .map(({ title }) => title); */
// }

// // Task 02.01 / 7.___________________________
// function logBookTitles(titles: Array<string>): void {
//     titles.forEach(title => console.log(title));
// }

// // Task 02.01 / 8.___________________________
// function getBookAuthorByIndex(index: number): [title: string, author: string] {   /* Task 02.01 / 9. - добавили мітки title: and author: до string, string */
//     const books = getAllBooks();

//     const { title, author } = books[index];
//     return [ title, author];
// }

// // Task 02.01 / 10.___________________________
// function calcTotalPages(): void {
//     const data = <const>[
//         { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
//         { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
//         { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
//     ];

//     const r = data.reduce((acc: bigint, obj ) => {
//         return acc + BigInt(obj.books)* BigInt(obj.avgPagesPerBook);
//     }, 0n);

//     console.log(r);
// }

// // Task 03.01 / 1.___________________________
// function createCustomerID(name: string, id: number): string {
//     return `${id}/${name}`;
// }

// // Task 03.02 / 1.___________________________
// function createCustomer(name: string, age?: number, city?: string): void {
//     console.log(`Customer name: ${name}`);

//     if (age) {
//         console.log(`Customer age: ${age}`);
//     }

//     if (city) {
//         console.log(`Customer city: ${city}`);
//     }
// }

// // Task 03.02 / 4. and Task 05.05 / 4.______________________
// function getBookByID(id: Book['id']): BookOrUndefin {
//     const books = getAllBooks();
//     return books.find(book => book.id === id);
// }

// // Task 03.02 / 5.___________________________
// function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
//     console.log(`Customer name: ${customer}`);

//     return bookIDs
//         .map(id => getBookByID(id))
//         .filter(book => book.available)
//         .map(book => book.title);
// }

// // Task 03.03 / 2.__Overloaded Function________
// function getTitles(author: string): string[];
// function getTitles(available: boolean): string[];
// function getTitles(id: number, available: boolean): string[];
// function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
//     const books = getAllBooks();

//     if (args.length === 1) {
//         const [arg] = args;

//         if (typeof arg === 'string') {
//             return books.filter(book => book.author === arg).map(book => book.title);
//         } else if (typeof arg === 'boolean') {
//             return books.filter(book => book.available === arg).map(book => book.title);
//         }

//     } else if (args.length === 2) {
//         const [id, available] = args;

//         if (typeof id === 'number' && typeof available === 'boolean') {
//             return books.filter(book => book.id === id && book.available === available).map(book => book.title);
//         }
//     }
// }

// // Task 03.04 / 1.__________________________
// function assertStringValue(data: any): asserts data is string {
//     if (typeof data !== 'string') {
//         throw new Error ('value should have been a string');
//     }
// }

// // Task 03.04 / 2.__________________________
// function bookTitleTransform(title: any): string {
//     assertStringValue(title);
//     return [...title].reverse().join('');
// }

// // Task 04.01 / 4.__________________________
// function printBook(book: Book): void {
//     console.log(`${book.title} by ${book.author}`);
// }

// // Task 04.05 / 2.___________________________
// function getProperty(book: Book, prop: BookProperties): any {
//     const value = book[prop];

//     return typeof value === 'function' ? value.name : value;
// }

// // Task 05.05 / 5.___________________________
// function setDefaultConfig(options: TOptions) {
//     options.duration ??= 100;
//     options.speed ??= 60;
//     return options;
// }

// Task 05.01 / 1. and Task 05.03 / 1. added 'abstract'__________
// abstract class ReferenceItem {
//     // title: string;
//     // year: number;

//     // constructor(newTitle: string, newYear: number) {
//     //     console.log('Creating a new ReferenceItem...');
//     //     this.title = newTitle;
//     //     this.year = newYear;
//     // }

//     // Task 05.01 / 5.___________________________
//     #id: number;

//     // Task 05.01 / 4.(a and b)___________________________
//     private _publisher: string;

//     get publisher(): string {
//         return this._publisher.toUpperCase();
//     }

//     set publisher(newPublisher: string) {
//         this._publisher = newPublisher;
//     }

//     // Task 05.01 / 6.___________________________
//     static department: string = 'Research Dep.';

//     // Task 05.01 / 3.___________________________
//     constructor(
//         id: number,
//         public title: string,
//         protected year: number
//     ) {
//         console.log('Creating a new ReferenceItem...');
//         this.#id = id;
//     }

//     printItem(): void {
//         console.log(`${this.title} was published in ${this.year}`);

//         // Task 05.01 / 6.___________________________
//         console.log(ReferenceItem.department);

//         console.log(Object.getPrototypeOf(this).constructor.department);
//     }

//     // Task 05.01 / 5.(b)___________________________
//     getID(): number {
//         return this.#id;
//     }
//     // Task 05.03 / 2.___________________________
//     abstract printCitation(): void;
// }

// // Task 05.02 / 1.___________________________
// class Encyclopedia extends ReferenceItem {
//     constructor(
//         id: number,
//         title: string,
//         year: number,
//         public edition: number
//     ) {
//         super(id, title, year);
//     }

//     // Task 05.02 / 3.___________________________
//     override printItem(): void {
//         super.printItem();
//         console.log(`Edition: ${this.edition} (${this.year})`);
//     }

//     // Task 05.03 / 3.___________________________
//     printCitation(): void {
//         console.log(`${this.title} - ${this.year}`);
//     }
// }

// Task 05.04 / 1.___________________________
// class UniversityLibrarian implements Librarian {
//     name: string;
//     email: string;
//     department: string;

//     assistCustomer(custName: string, bookTitle: string): void {
//         console.log(`${this.name} is assisting ${custName} with book ${bookTitle}`);
//     }
// }

// ========================================================
// // Task 02.01 / 1.___________________________
// console.log(getAllBooks());

// // Task 02.01 / 3.___________________________
// logFirstAvailable(getAllBooks());

// // Task 02.01 / 7.___________________________
// logBookTitles(getBookTitlesByCategory(Category.JavaScript));

// // Task 02.01 / 8.___________________________
// console.log(getBookAuthorByIndex(0));

// // Task 02.01 / 10.___________________________
// calcTotalPages();

// END Task 02.01____________________________

// Task 02.02 / 1.___________________________
// add readonly to function getAllBooks()

// Task 02.02 / 2.___________________________
// add readonly to function logFirstAvailable()

// END Task 02.02____________________________

// Task 03.01 / 2.___________________________
// const myID: string = createCustomerID('Ann', 10);
// console.log(myID);

// Task 03.01 / 3.___________________________
// let idGenerator: (name: string, id: number) => string;  /* option 1.  Function Type */
// let idGenerator: typeof createCustomerID; /* option 2. Function Type. typeof в позиції типу */

// idGenerator = (name: string, id: number) => `${id}/${name}`;  /* Arrow Function*/

// Task 03.01 / 4.___________________________
// idGenerator = createCustomerID;
// console.log(idGenerator('Boris', 20));

// Task 03.02 / 1.___________________________
// createCustomer('Anna');
// createCustomer('Anna', 30);
// createCustomer('Anna', 30, 'Kyiv');

// Task 03.02 / 2.___________________________
// console.log(getBookTitlesByCategory());
// console.log(getBookTitlesByCategory(Category.CSS));

// Task 03.02 / 3.___________________________
// logFirstAvailable();

// Task 03.02 / 4.___________________________
// console.log(getBookByID(1));

// Task 03.02 / 5.___________________________
// console.log(сheckoutBooks('NoName Customer', ...[1, 2, 4]));

// Task 03.03 / __Overloaded Function________
// console.log(getTitles(1, true));
// console.log(getTitles(true));
// console.log(getTitles(false));
// console.log(getTitles(2, false));
// console.log(getTitles('Lea Verou'));

// Task 03.04 / 3.__________________________
// console.log(bookTitleTransform('Learn TypeScript'));
// console.log(bookTitleTransform(123));
// console.log(bookTitleTransform([]));

// Task 04.01 / 5.__________________________
// const myBook: Book = {
//     id: 5,
//     title: 'Colors, Backgrounds, and Gradients',
//     author: 'Eric A. Meyer',
//     available: true,
//     category: Category.CSS,
//     // year: 2015,
//     // copies: 3
//     pages: 200,  /* Task 04.01 / 8. */

//     // Task 04.01 / 9. First option
//     // markDamaged: (reason: string) => console.log(`Damaged: ${reason}`)

//     // Task 04.01 / 9. Second option (New sintacsis 2015)
//     markDamaged(reason: string) {
//         console.log(`Damaged: ${reason}`);
//     }
// };

// Task 04.01 / 6.__________________________
// printBook(myBook);

// Task 04.01 / 9.__________________________
// myBook.markDamaged('missing back cover');

// Task 04.02 / 3.___________________________
// const logDamage: DamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);
// const logDamage: Logger = (reason: string) => console.log(`Damaged: ${reason}`);
// logDamage('missing back cover');

// Task 04.03 / 4.___________________________
// const favoriteAuthor: Author = {
//     name: 'Anna',
//     email: 'anna@example.com',
//     numBooksPublished: 2
// };

// Task 04.03 / 5.___________________________
// const favoriteLibrarian: Librarian = {
//     name: 'Boris',
//     email: 'boris@example.com',
//     department: 'Classical Literature',
//     assistCustomer: null
// };

// Task 04.04 / 1.___________________________
// const offer: any = {
//     book: {
//         title: 'Essential TypeScript',
//     },
// };

// Task 04.04 / 2.___________________________
// console.log(offer.magazine);
// console.log(offer.magazine?.getTitle());
// console.log(offer.book.getTitle?.());
// console.log(offer.book.authors?.[0]);

// Task 04.05 / 3.___________________________
// console.log(getProperty(myBook, 'title'));
// console.log(getProperty(myBook, 'markDamaged'));
// console.log(getProperty(myBook, 'isbn'));

// Task 05.01 / 2.___________________________
// const ref = new ReferenceItem(1, 'Learn TypeScript', 2022);
// console.log(ref);
// ref.printItem();

// // Task 05.01 / 4.(c)___________________________
// ref.publisher = 'abc group';
// console.log(ref.publisher);

// // Task 05.01 / 5.(d)___________________________
// console.log(ref.getID());

// Task 05.02 / 2.___________________________
//
// const refBook: Encyclopedia = new Encyclopedia(1, 'Learn TypeScript', 2022, 2);
// const refBook: Refbook = new Refbook(1, 'Learn TypeScript', 2022, 2);
// refBook.printItem();
// console.log(refBook);

// // Task 05.03 / 4.___________________________
// refBook.printCitation();

// Task 05.04 / 2., 06.04 / 6.___________________________
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// favoriteLibrarian.name = 'Anna';
// favoriteLibrarian.assistCustomer('Boris', 'Learn TypeScript');

// Task 05.05 / 2.___________________________
// const PersonBook: PersonBook = {
//     name: 'Anna',
//     author: 'Anna',
//     available: false,
//     category: Category.Angular,
//     email: 'anna@example.com',
//     id: 1,
//     title: 'Unknouwn'
// };

// Task 05.05 / 5.___________________________
// const options: TOptions = { duration: 20 };
// const options2 = setDefaultConfig(options);
// console.log(options);
// console.log(options2);
// console.log(Object.is(options, options2));

// // Task 06.03 / 6.__________________________
// const refBook: Refbook = new Refbook(1, 'Learn TypeScript', 2022, 2);
// printRefBook(refBook);

// // Task 06.03 / 7., 06.04 / 6.__________________________
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// printRefBook(favoriteLibrarian);

// Task 06.05 / 3.__________________________
// const flag = true;

// if (flag) {
//     import('./classes')
//         .then(o => {
//             const reader = new o.Reader();
//             reader.name = 'Anna';
//             reader.take(getAllBooks()[0]);

//             console.log(reader);
//         })
//         .catch(err => console.log(err))
//         .finally(() => console.log('Complete!'));

// }

// if (flag) {
//     const o = await import('./classes');

//     const reader = new o.Reader();
//     reader.name = 'Anna';
//     reader.take(getAllBooks()[0]);

//     console.log(reader);
// }

// Task 06.06 / 3.__________________________
// let library: Library;

// Task 06.06 / 4.__________________________
// let library: Library = new Library();

// Task 06.06 / 5.__________________________
// let library: Library = {
//     Id: 1,
//     address: '',
//     name: 'Anna'
// };
// console.log(library);

// // Task 07.01 / 4.__________________________
// const inventory: Book[] = [
//     { id: 10, title: 'The C Programming Language', author: '???', available: true, category: Category.Software},
//     { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
//     { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
//     { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
// ];

// // Task 07.01 / 5.__________________________
// const result1 = purge<Book>(inventory);
// console.log(result1);

// // Task 07.01 / 6.__________________________
// const result2 = purge([1, 2, 3]);
// console.log(result2);

// Task 07.02 / 6.__________________________
// Option 1
// const bookShelf: Shelf<Book> = new Shelf<Book>();
// Option 2
// const bookShelf = new Shelf<Book>();
// inventory.forEach(book => bookShelf.add(book));
// console.log(bookShelf.getFirst().title);

// Task 07.02 / 7.__________________________
// const magazines: Magazine[] = [
//     { title: 'Programming Language Monthly', publisher: 'Code Mags' },
//     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//     { title: 'Five Points', publisher: 'GSU' }
// ];

// Task 07.02 / 8.__________________________
// const magazineShelf = new Shelf<Magazine>();
// magazines.forEach(mag => magazineShelf.add(mag));
// console.log(magazineShelf.getFirst().title);

// Task 07/03 / 4.___________________________
// magazineShelf.printTitles();

// Task 07/03 / 5.___________________________
// console.log(magazineShelf.find('Five Points'));

// Task 07/03 / 6.___________________________
// console.log(getObjectProperty(magazines[0], 'title'));
// console.log(getObjectProperty(inventory[1], 'author'));

// // Task 07.04 / 2.__________________________
// const bookRequiredFields: BookRequiredFields = {
//     author: 'Anna',
//     available: false,
//     category: Category.Angular,
//     id: 1,
//     markDamaged: null,
//     pages: 200,
//     title: 'Learn Angular'
// };

// // Task 07.04 / 4.__________________________
// const updatedBook: UpdatedBook = {
//     id: 1,
//     pages: 300
// };

// // Task 07.04 / 7.__________________________
// let params: Parameters<СreateCustomerFunctionType>;
// params = ['Anna', 30, 'Kyiv'];
// createCustomer(...params);

// // Task 08.01 / 3.________________________
// const favoriteLibrarian1 = new UL.UniversityLibrarian();

// favoriteLibrarian1['a'] = 1;
// // UL.UniversityLibrarian['a'] = 2;
// // UL.UniversityLibrarian.prototype['a'] = 3;

// // Task 08.02 / 6.________________________
// const favoriteLibrarian1 = new UL.UniversityLibrarian();

// console.log(favoriteLibrarian1);
// favoriteLibrarian1.name = 'Anna';
// favoriteLibrarian1['printLibrarian']();

// // Task 08.03 / 4.________________________
// const favoriteLibrarian = new UL.UniversityLibrarian();
// console.log(favoriteLibrarian);
// favoriteLibrarian.assistFaculty = null;
// favoriteLibrarian.teachCommunity = null;

// // Task 08.04 / 4.________________________
// const refBook: Refbook = new Refbook(1, 'Learn TypeScript', 2022, 2);
// refBook.printItem();

// // Task 08.05 / 5.________________________
// const favoriteLibrarian = new UL.UniversityLibrarian();
// console.log(favoriteLibrarian);
// favoriteLibrarian.name = 'Anna';
// favoriteLibrarian.assistCustomer('Boris', 'Learn TypeScript');

// // Task 08.06 / 5.________________________
// const favoriteLibrarian = new UL.UniversityLibrarian();
// favoriteLibrarian.name = 'Anna';
// console.log(favoriteLibrarian.name);
// favoriteLibrarian.assistCustomer('Boris', 'Learn TypeScript');
// console.log(favoriteLibrarian);

// // Task 08.07 / 4.________________________
// const refBook: Refbook = new Refbook(1, 'Learn TypeScript', 2022, 2);
// // refBook.copies = 10;
// refBook.copies = -10;
// console.log(refBook.copies);

// // Task 09.01 / 6. Callback Function____________
// console.log('Begin');
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// getBooksByCategory(Category.Software, logCategorySearch);
// console.log('End');

// // Task 09.02 / 3. Promises_______________________
// console.log('Begin');
// getBooksByCategoryPromise(Category.JavaScript)
//     .then(titles => {
//         console.log(titles);
//         return Promise.resolve(titles.length);
//     })
//     .then(n => console.log(n))
//     .catch(reason => console.log(reason));
// getBooksByCategoryPromise(Category.Software)
//     .then(titles => console.log(titles))
//     .catch(reason => console.log(reason));
// console.log('End');

// Task 09.03 / 2. Async Functions _________________
console.log('Begin');
logSearchResults(Category.JavaScript);
logSearchResults(Category.Software).catch(err => console.log(err));
console.log('End');