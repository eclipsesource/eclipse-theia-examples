import { injectable } from "inversify";

//Need Symbol as interfaces are not available in JS
export const InterfaceA = Symbol('InterfaceA');
export interface InterfaceA {
    foo(): void;
}

//You can alternativly use Strings
export const InterfaceB = 'InterfaceB';
export interface InterfaceB {
    bar(): void;
}

export const InterfaceC = Symbol('InterfaceC');
export interface InterfaceC {
    foo(): void;
}

@injectable()
export class ClassA implements InterfaceA {
    foo(): void {
        console.log('ClassA foo');
    }
}

@injectable()
export class ClassBC implements InterfaceB, InterfaceC {
    foo(): void {
        console.log('ClassBC foo');
    }
    bar(): void {
        console.log('ClassBC bar');
    }
}

@injectable()
export class MyClass {
    foo() {
        console.log('MyClass foo')
    };
}

@injectable()
export class AutoInject {
    foo() {
        console.log('AutoInjectClass foo')
    };
}



