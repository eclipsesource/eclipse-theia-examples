/**
 * Generated using theia-extension-generator
 */

import { CommandContribution} from '@theia/core';
import { WebSocketConnectionProvider } from "@theia/core/lib/browser";
import { ContainerModule, injectable } from "inversify";
import { BackendClient, HelloBackendWithClientService, HelloBackendService, HELLO_BACKEND_PATH, HELLO_BACKEND_WITH_CLIENT_PATH } from '../common/protocol';
import { BackendExampleCommandContribution} from './command-menu-contribution';

export default new ContainerModule(bind => {
    bind(CommandContribution).to(BackendExampleCommandContribution).inSingletonScope();
    bind(BackendClient).to(BackendClientImpl).inSingletonScope();

    bind(HelloBackendService).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        return connection.createProxy<HelloBackendService>(HELLO_BACKEND_PATH);
    }).inSingletonScope();

    bind(HelloBackendWithClientService).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        const backendClient: BackendClient = ctx.container.get(BackendClient);
        return connection.createProxy<HelloBackendWithClientService>(HELLO_BACKEND_WITH_CLIENT_PATH, backendClient);
    }).inSingletonScope();
});

@injectable()
class BackendClientImpl implements BackendClient {
    getName(): Promise<string> {
        return new Promise(resolve => resolve('Client'));
    }

}