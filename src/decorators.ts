// Task 08.01 / 1.__________________________
export function sealed(param: string) {
    return function (constructor: Function): void {
        console.log(`Sealing the constructor ${param}`);
        console.log(constructor);
        console.log(constructor.prototype);

        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}

// Task 08.02 / 1.__________________________
export function logger<TFunction extends Function>(constructor: TFunction): TFunction {
    const newConstructor: Function = function () {
        console.log('Creating new instance');
        console.log(constructor);

        this.age = 30;
    };

    // Task 08.02 / 3.__________________________
    newConstructor.prototype = Object.create(constructor.prototype);

    // Task 08.02 / 4.__________________________
    newConstructor.prototype.printLibrarian = function (): void {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };

    // Task 08.02 / 5.__________________________
    return newConstructor as TFunction;
}

// Task 08.03 / 1.__________________________
export function writable(isWritable: boolean) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        console.log(target);
        console.log(methodName);
        console.log(descriptor);

        descriptor.writable = isWritable;

        return descriptor;
    };
}

// Task 08.04 / 1.-2.__________________________
export function timeout(ms: number) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            if (window.confirm('Are you sure?')) {
                setTimeout(() => {
                    originalMethod.apply(this, args);
                }, ms);
            }
        };

        return descriptor;
    };
}

// Task 08.05 / 1.__________________________
export function logParameter(target: any, methodName: string, index: number) {
    const key = `${methodName}_decor_params_indexes`;
    const proto = typeof target === 'function' ? target.prototype : target;

    (proto[key] ??= []).push(index);
}

// Task 08.05 / 2.__________________________
export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const key = `${methodName}_decor_params_indexes`;
        const proto = typeof target === 'function' ? target.prototype : target;
        const indexes = proto[key];

        if (Array.isArray(indexes)) {
            args.forEach((arg, index) => {
                if (indexes.includes(index)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            });
        }

        return originalMethod.apply(this, args);
    };

    return descriptor;
}

// Task 08.06 / 2.__________________________
function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer?: (value: any) => T,
    setTransformer?: (value: any) => T
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    });
}

// Task 08.06 / 1.__________________________
export function format(pref: string = 'Mr./Mrs.') {
    return function(target: any, propName: string) {
        makeProperty(target, propName, value => `${pref} ${value}`, value => value);
    };
}

// Task 08.07 / 1.__________________________
export function positiveInteger(target: any, propName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const origionalSet = descriptor.set;

    descriptor.set = function(value: number) {
        if(value < 1 || !Number.isInteger(value)) {
            throw new Error('Invalid value');
        }

        if (origionalSet) {
            origionalSet.call(this, value);
        }
    };

    return descriptor;
}