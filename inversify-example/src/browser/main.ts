import { Container } from "inversify";
import "reflect-metadata";
import { ClassConsumer, CollectionConsumer, InterfaceConsumer, InterfaceViaStringConsumer } from "./consumer";
import { AutoInject } from "./contributions";
import exampleModule from './module';

// auto bind injectable is not enabled in Eclipse Theia by default, see browser-app/src-gen/frontend/index.js. Therefore, auto inject will not work in Theia, all contributions need to registered in a module
//For this example, we turn auto inject for demonstration reasons
const container = new Container({ autoBindInjectable: true });
//we could bind on the container directly, but we use a module to do all bindings in a separate file as this is usually done in Eclipse Theia, too
container.load(exampleModule);
container.get(InterfaceConsumer).doSth();
container.get(InterfaceViaStringConsumer).doSth();
container.get(ClassConsumer).doSth();
container.get(CollectionConsumer).doSth();
container.get(AutoInject).foo();
//Manually instanciate a class without the usage of inversify for testing using a mock
new CollectionConsumer([{ foo(): void { console.log('Mock foo') }}]).doSth();