import { CommonMenus } from '@theia/core/lib/browser';
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, SelectionService } from '@theia/core/lib/common';
import { UriAwareCommandHandler } from '@theia/core/lib/common/uri-command-handler';
import { EDITOR_CONTEXT_MENU } from '@theia/editor/lib/browser';
import { NAVIGATOR_CONTEXT_MENU } from '@theia/navigator/lib/browser/navigator-contribution';
import { inject, injectable } from 'inversify';
import { ClickCommand, ClickCommandHandler } from './click-command';
import { ToggleCommand, ToggleCommandHandler } from './toggle-command';

export const EXAMPLE_NAVIGATOR = [...NAVIGATOR_CONTEXT_MENU, 'example'];
export const EXAMPLE_EDITOR = [...EDITOR_CONTEXT_MENU, 'example'];

@injectable()
export class CommandExampleCommandContribution implements CommandContribution {

    constructor(

        @inject(SelectionService) private readonly selectionService: SelectionService,
        @inject(ToggleCommandHandler) private readonly toggleCommandHandler: ToggleCommandHandler,
        @inject(ClickCommandHandler) private readonly clickCommandHandler: ClickCommandHandler,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(ClickCommand, new UriAwareCommandHandler(this.selectionService, this.clickCommandHandler));
        registry.registerCommand(ToggleCommand, this.toggleCommandHandler);
    }
}

@injectable()
export class CommandExampleMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: ClickCommand.id
        });
        menus.registerMenuAction(EXAMPLE_NAVIGATOR, {
            commandId: ClickCommand.id,
            label: 'Say Hello Navigator'
        });
        menus.registerMenuAction(EXAMPLE_EDITOR, {
            commandId: ClickCommand.id,
            label: 'Say Hello Editor'
        });

        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: ToggleCommand.id
        });
    }

}