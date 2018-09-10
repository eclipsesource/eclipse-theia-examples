
import { ContainerModule } from 'inversify';
import { ClassToBind, InjectionExample, InterfaceViaSymbol, ClassForInterfaceViaSymbol, InterfaceViaString, ClassForInterfaceViaString, ClassAB, InterfaceA, InterfaceB, InterfaceDynamic } from './classes';

export default new ContainerModule(bind => {

    //bind class
    bind(ClassToBind).toSelf();
    // bind interface
    bind(InterfaceViaSymbol).to(ClassForInterfaceViaSymbol);
    bind(InterfaceViaString).to(ClassForInterfaceViaString);

    // bind multiple interfaces to same class
    bind(ClassAB).toSelf();
    [InterfaceA, InterfaceB].forEach(i => bind(i).toService(ClassAB));

    //dynamic binding (in theia used for proxy bindings)
    bind(InterfaceDynamic).toDynamicValue(() => ({ do(): void { console.log('Dynamic One') } }));
    bind(InterfaceDynamic).toDynamicValue(() => ({ do(): void { console.log('Dynamic Two') } }));


    //runnner
    bind(InjectionExample).toSelf();
});
