
import { ContainerModule } from 'inversify';
import { MyClass, InterfaceA, InterfaceB, ClassA, ClassBC, InterfaceC } from './contributions';

export default new ContainerModule(bind => {

    // bind one interface
    bind(InterfaceA).to(ClassA);

    // bind several interfaces to the same class
    [InterfaceB, InterfaceC].forEach(i => bind(i).toService(ClassBC));

    //bind class
    bind(MyClass).toSelf();

    //dynamic binding (in theia used for proxy bindings)
    bind(InterfaceC).toDynamicValue(() => ({ foo(): void { console.log('Dynamic foo') } }));
});
