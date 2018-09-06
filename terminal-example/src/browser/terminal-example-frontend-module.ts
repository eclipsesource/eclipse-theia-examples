/**
 * Generated using theia-extension-generator
 */

import { CommandContribution, MenuContribution } from '@theia/core';
import { ContainerModule } from 'inversify';
import { MyTerminalCommandsContribution, MyTerminalMenuContribution } from './terminal-contribution';

export default new ContainerModule(bind => {
    // bind menu entry and command to execute command on terminal
    bind(MenuContribution).to(MyTerminalMenuContribution);
    bind(CommandContribution).to(MyTerminalCommandsContribution);
});