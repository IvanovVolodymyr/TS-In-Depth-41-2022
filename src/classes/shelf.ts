import { ShelfItem } from '../interfaces';

// Task 07.02 / 2.___________________________
export default class Shelf<T extends ShelfItem> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getFirst(): T {
        return this.items[0];
    }

    // Task 07.03 / 1.________________________
    find(title: string): T {
        return this.items.find(item => item.title === title);
    }

    printTitles(): void {
        this.items.forEach(item => console.log(item.title));
    }
}