import { inject, injectable, multiInject } from "inversify";

//this is always needed
@injectable()
export class ClassToBind {
    do() {
        console.log('Bound Class')
    };
}

//need Symbol as interfaces are not available in JS
export const InterfaceViaSymbol = Symbol('InterfaceViaSymbol');
export interface InterfaceViaSymbol {
    do(): void;
}
@injectable()
export class ClassForInterfaceViaSymbol implements InterfaceViaSymbol {
    do(): void {
        console.log('Class Via Symbol');
    }
}
//You can of course also use Strings
export const InterfaceViaString = 'InterfaceViaString';
export interface InterfaceViaString {
    do(): void;
}
@injectable()
export class ClassForInterfaceViaString implements InterfaceViaString {
    do(): void {
        console.log('Class Via String');
    }
}


export const InterfaceA = Symbol('InterfaceA');
export interface InterfaceA {
    foo(): void;
}
export const InterfaceB = Symbol('InterfaceB');
export interface InterfaceB {
    bar(): void;
}
@injectable()
export class ClassAB implements InterfaceA, InterfaceB {
    foo(): void {
        console.log('foo');
    }
    bar(): void {
        console.log('bar');
    }


}
export const InterfaceDynamic = Symbol('InterfaceDynamic');
export interface InterfaceDynamic {
    do(): void;
}

@injectable()
export class InjectionExample {
    @inject(InterfaceA) private interfaceA: InterfaceA;
    @inject(InterfaceB) private interfaceB: InterfaceB;

    constructor(
        @inject(ClassToBind) private classToBind: ClassToBind,
        @inject(InterfaceViaSymbol) private interfaceViaSymbol: InterfaceViaSymbol,
        @inject('InterfaceViaString') private interfaceViaString: InterfaceViaString,
        @multiInject(InterfaceDynamic) private interfaceDynamics: InterfaceDynamic[],
    ) { }

    print() {
        this.classToBind.do();
        this.interfaceViaSymbol.do();
        this.interfaceViaString.do();

        this.interfaceA.foo();
        this.interfaceB.bar();

        this.interfaceDynamics.forEach(element => element.do());
    }
}

