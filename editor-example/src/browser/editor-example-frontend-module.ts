/**
 * Generated using theia-extension-generator
 */

import { OpenHandler, WidgetFactory } from "@theia/core/lib/browser";
import { ContainerModule } from "inversify";
import '../../src/browser/style/example.css';
import { MyOpenHandler } from './my-openhandler';
import { MyWidgetFactory } from './my-widget-factory';


export default new ContainerModule(bind => {
    // bind open handler    
    bind(OpenHandler).to(MyOpenHandler);
    //bind widget factory
    bind(WidgetFactory).to(MyWidgetFactory);

});