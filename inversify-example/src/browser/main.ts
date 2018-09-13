import "reflect-metadata";
import { Container } from "inversify";
import { InjectionExample } from "./classes";
import exampleModule from './module';

// auto bind injectable is not enable in eclipse theia by default, see browser-app/src-gen/frontend/index.js
const container = new Container({autoBindInjectable:true});
//we could bind on the container directly, bu we use a module to do all bindings in a separate file
container.load(exampleModule);
container.get(InjectionExample).print();