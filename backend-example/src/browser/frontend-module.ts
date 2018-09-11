/**
 * Generated using theia-extension-generator
 */

import { CommandContribution, MenuContribution } from '@theia/core';
import { WebSocketConnectionProvider } from "@theia/core/lib/browser";
import { ContainerModule, injectable } from "inversify";
import { BackendClient, BackendWithClient, BackendWithoutClient, WITHOUT_CLIENT_PATH, WITH_CLIENT_PATH } from '../common/protocol';
import { BackendExampleCommandContribution, BackendExampleMenuContribution } from './command-menu-contribution';

export default new ContainerModule(bind => {
    bind(CommandContribution).to(BackendExampleCommandContribution).inSingletonScope();
    bind(MenuContribution).to(BackendExampleMenuContribution).inSingletonScope();
    bind(BackendClient).to(BackendClientImpl).inSingletonScope();

    bind(BackendWithoutClient).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        return connection.createProxy<BackendWithoutClient>(WITHOUT_CLIENT_PATH);
    }).inSingletonScope();

    bind(BackendWithClient).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        const client = ctx.container.get(BackendClient)
        return connection.createProxy<BackendWithClient>(WITH_CLIENT_PATH, client);
    }).inSingletonScope();
});

@injectable()
class BackendClientImpl implements BackendClient {
    toGreet(): Promise<string> {
        return new Promise(resolve => resolve('Me Client'));
    }

}