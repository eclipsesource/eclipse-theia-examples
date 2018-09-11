import { Command, CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry } from '@theia/core/lib/common';
import { inject, injectable } from 'inversify';
import { BackendWithClient, BackendWithoutClient } from '../common/protocol';

const MY_MAIN_MENU = [...MAIN_MENU_BAR, '9_mymenu'];

const WithClientCommand: Command = {
    id: 'with-client.command',
    label: 'Greet From Backend With Client',
};

const WithoutClientCommand: Command = {
    id: 'without-client.command',
    label: 'Greet From Backend Without Client',
};

@injectable()
export class BackendExampleCommandContribution implements CommandContribution {

    constructor(

        @inject(BackendWithClient) private readonly backendWithClient: BackendWithClient,
        @inject(BackendWithoutClient) private readonly backendWithoutClient: BackendWithoutClient,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(WithClientCommand, {
            execute: () => this.backendWithClient.greet().then(r => console.log(r))
        });
        registry.registerCommand(WithoutClientCommand, {
            execute: () => this.backendWithoutClient.greet('Me Parameter').then(r => console.log(r))
        });
    }
}

@injectable()
export class BackendExampleMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {

        menus.registerMenuAction(MY_MAIN_MENU, {
            commandId: WithClientCommand.id
        });
        menus.registerMenuAction(MY_MAIN_MENU, {
            commandId: WithoutClientCommand.id
        });
    }

}