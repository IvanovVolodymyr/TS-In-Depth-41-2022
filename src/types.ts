import { createCustomer, getBooksByCategoryPromise } from './functions';
import { Author, Book, Person } from './interfaces';

// Task 02.01 / 1.________________________________________
// export type Book = {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
// };

// Task 04.05 / 1.___________________________
export type BookProperties = keyof Book; // | 'isbn';

// Task 05.05 / 1.___________________________
export type PersonBook = Person & Book;

// Task 05.05 / 3.___________________________
export type BookOrUndefin = Book | undefined;

// Task 07.04 / 1.___________________________
export type BookRequiredFields = Required<Book>;

// Task 07.04 / 3.___________________________
export type UpdatedBook = Partial<Book>;

// Task 07.04 / 5.___________________________
export type AuthorWoEmail = Omit<Author, 'email'>;

// Task 07.04 / 6.___________________________
export type СreateCustomerFunctionType = typeof createCustomer;

// Task 07.05 / 1.___________________________
export type fn = (a: string, b: number, c: boolean) => symbol;

// Task 07.05 / 2.___________________________
export type Param1<T> = T extends (a: infer R, b: number, c: boolean) => symbol ? R : never;
export type Param2<T> = T extends (a: string, b: infer R, c: boolean) => symbol ? R : never;
export type Param3<T> = T extends (a: string, b: number, c: infer R) => symbol ? R : never;

// Task 07.05 / 3.___________________________
export type P1 = Param1<fn>;
export type P2 = Param2<fn>;
export type P3 = Param3<fn>;

// Task 07.05 / 4.___________________________
export type RequiredProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? never : prop
}[keyof T];

export type OptionalProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? prop : never
}[keyof T];

// Task 07.05 / 5.___________________________
type BookRequiredProps = RequiredProps<Book>;
type BookOptionalProps = OptionalProps<Book>;

// Task 07.05 / 6.___________________________
type RemoveProps<T extends object, TProps extends keyof T> = {
    [prop in keyof T as Exclude<prop, TProps>]: T[prop];
};

// Task 07.05 / 7.___________________________
type BookRequiredPropsType = RemoveProps<Book, BookOptionalProps>;
type BookOptionalPropsType = RemoveProps<Book, BookRequiredProps>;

// Task 09.02 / 5. Promises_______________________
export type Unpromisify<T> = T extends Promise<infer R> ? R : never;
export type UnArrayy<T> = T extends Array<infer R> ? R : never;

// Task 09.02 / 6.-7. Promises_______________________
// // pr = Promise<string[]>
// type pr = ReturnType<typeof getBooksByCategoryPromise>;

// pr = string[]
type pr = Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>;

// // pr = string
// type pr = UnArrayy<Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>>;