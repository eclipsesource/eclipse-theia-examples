import "reflect-metadata";
import { Container } from "inversify";
import { InjectionExample } from "./classes";
import exampleModule from './module';

let container = new Container();
//we could bind on the container directly, bu we use a module to do all bindings in a separate file
container.load(exampleModule);
container.get(InjectionExample).print();