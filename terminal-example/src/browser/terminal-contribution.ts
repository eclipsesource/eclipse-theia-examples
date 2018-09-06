import { Command, CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry } from '@theia/core';
import { TerminalService } from "@theia/terminal/lib/browser/base/terminal-service";
import { inject, injectable } from 'inversify';

const command: Command = { id: 'my-terminal.command', label: 'Print to Terminal' };

@injectable()
export class MyTerminalCommandsContribution implements CommandContribution {

    @inject(TerminalService) private readonly terminalService: TerminalService

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(
            command,
            {
                execute: async () => this.terminalService.newTerminal({
                    title: "My Terminal"
                }).then(terminalWidget => {
                    terminalWidget.start().then(number => {
                        this.terminalService.activateTerminal(terminalWidget);
                        terminalWidget.sendText("echo -e 'Hello\\vWorld'\n");
                    })
                })
            });
    }
}

const MY_MAIN_MENU = [...MAIN_MENU_BAR, '9_mymenu'];
@injectable()
export class MyTerminalMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(MY_MAIN_MENU, { commandId: command.id });
    }
}