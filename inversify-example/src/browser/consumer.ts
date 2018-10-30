import { inject, injectable, multiInject } from "inversify";
import { InterfaceA, InterfaceB, InterfaceC, MyClass } from "./contributions";
@injectable()
export class InterfaceConsumer {
    @inject(InterfaceA) private interfaceA: InterfaceA;

    constructor(
        @inject(InterfaceB) private interfaceB: InterfaceB
    ) { }

    doSth() {
        this.interfaceA.foo();
        this.interfaceB.bar();
    }
}

@injectable()
export class InterfaceViaStringConsumer {

    constructor(
        @inject('InterfaceB') private interfaceB: InterfaceB
    ) { }

    doSth() {
        this.interfaceB.bar();
    }
}

@injectable()
export class ClassConsumer {

    constructor(
        @inject(MyClass) private myClass: MyClass
    ) { }

    doSth() {
        this.myClass.foo();
    }
}

@injectable()
export class CollectionConsumer {

    constructor(
        @multiInject(InterfaceC) private setOfInterfaceC: InterfaceC[],
    ) { }

    doSth() {
        this.setOfInterfaceC.forEach(interfaceC => interfaceC.foo()); 
    }
}