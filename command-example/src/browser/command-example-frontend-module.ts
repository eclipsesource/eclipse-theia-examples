/**
 * Generated using theia-extension-generator
 */

import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from 'inversify';
import '../../src/browser/style/example.css';
import { ClickCommandHandler } from './click-command';
import { CommandExampleCommandContribution, CommandExampleMenuContribution } from './command-example-contribution';
import { ToggleCommandHandler } from './toggle-command';

export default new ContainerModule(bind => {
    // bind command handler
    bind(ToggleCommandHandler).toSelf();
    bind(ClickCommandHandler).toSelf();
    // bind command and menu registration
    bind(CommandContribution).to(CommandExampleCommandContribution);
    bind(MenuContribution).to(CommandExampleMenuContribution);
});