import { NavigatableWidgetOpenHandler } from "@theia/core/lib/browser";
import URI from "@theia/core/lib/common/uri";
import { injectable } from "inversify";
import { MyWidget } from "./my-widget";
import { MyWidgetFactory } from './my-widget-factory';

@injectable()
export class MyOpenHandler extends NavigatableWidgetOpenHandler<MyWidget> {

    readonly id = MyWidgetFactory.ID;
    readonly label = 'My Editor'
    readonly iconClass = 'my-icon my-openhandler';

    canHandle(uri: URI): number {
        if (uri.path.ext === '.my') {
            return 1000;
        }
        return 0;
    }
}