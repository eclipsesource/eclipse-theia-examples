import { CommonMenus } from '@theia/core/lib/browser';
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, SelectionService } from '@theia/core/lib/common';
import URI from '@theia/core/lib/common/uri';
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

        // workaround due to missing isToggled delegation
        const toggleHandler = new class extends UriAwareCommandHandler<URI>{
            isToggled() { return (this.handler as ToggleCommandHandler).isToggled() }
        }(this.selectionService, this.toggleCommandHandler);
        registry.registerCommand(ToggleCommand, toggleHandler);
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
        menus.registerMenuAction(EXAMPLE_NAVIGATOR, {
            commandId: ToggleCommand.id,
            label: 'Toggle State Navigator'
        });
        menus.registerMenuAction(EXAMPLE_EDITOR, {
            commandId: ToggleCommand.id
        });
    }

}