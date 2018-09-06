/**
 * Generated using theia-extension-generator
 */

import { CommandContribution, MenuContribution } from '@theia/core';
import { TaskContribution } from '@theia/task/lib/browser';
import { ContainerModule } from 'inversify';
import { MyTaskCommandsContribution, MyTaskMenuContribution, MyTasksContribution } from './task-contribution';

export default new ContainerModule(bind => {
    // bind task contribution (register task)
    bind(TaskContribution).to(MyTasksContribution);
    // bind menu entry and command to trigger task
    bind(MenuContribution).to(MyTaskMenuContribution);
    bind(CommandContribution).to(MyTaskCommandsContribution);
});