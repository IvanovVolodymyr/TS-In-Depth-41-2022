/* eslint-disable no-underscore-dangle */

import { timeout } from '../decorators';

abstract class ReferenceItem {
    // title: string;
    // year: number;

    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

   // Task 05.01 / 5.___________________________
   #id: number;

   // Task 05.01 / 4.(a and b)___________________________
   private _publisher: string;

   get publisher(): string {
       return this._publisher.toUpperCase();
   }

   set publisher(newPublisher: string) {
       this._publisher = newPublisher;
   }

   // Task 05.01 / 6.___________________________
   static department: string = 'Research Dep.';

   // Task 05.01 / 3.___________________________
   constructor(
       id: number,
       public title: string,
       protected year: number
   ) {
       console.log('Creating a new ReferenceItem...');
       this.#id = id;
   }

   @timeout(2000)
   printItem(): void {
       console.log(`${this.title} was published in ${this.year}`);

       // Task 05.01 / 6.___________________________
       console.log(ReferenceItem.department);

       console.log(Object.getPrototypeOf(this).constructor.department);
   }

   // Task 05.01 / 5.(b)___________________________
   getID(): number {
       return this.#id;
   }
   // Task 05.03 / 2.___________________________
   abstract printCitation(): void;
}


export {ReferenceItem};