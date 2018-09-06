import { CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry } from '@theia/core';
import { TaskContribution, TaskProviderRegistry, TaskService } from '@theia/task/lib/browser';
import { TaskConfiguration } from '@theia/task/lib/common/task-protocol';
import { inject, injectable } from 'inversify';

const myCreateTask: TaskConfiguration = {
    label: 'My Create Task',
    type: 'process',
    cwd: '${workspaceFolder}',
    command: "touch",
    args: [
        'dummy.my'
    ]
}

const myDeleteTask: TaskConfiguration = {
    label: 'My Delete Task',
    type: 'process',
    cwd: '${workspaceFolder}',
    command: "rm",
    args: [
        'dummy.my'
    ]
}

@injectable()
export class MyTasksContribution implements TaskContribution {
    registerProviders(providers: TaskProviderRegistry) {
        providers.register('process', {
            provideTasks: () => new Promise(resolve => resolve([myCreateTask, myDeleteTask]))
        });
    }
}

@injectable()
export class MyTaskCommandsContribution implements CommandContribution {

    @inject(TaskService)
    private readonly taskService: TaskService;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(
            { id: 'my-task.command', label: 'Run ' + myCreateTask.label },
            { execute: () => this.taskService.run(myCreateTask.type, myCreateTask.label) });
    }

}
const MY_MAIN_MENU = [...MAIN_MENU_BAR, '9_mymenu'];
@injectable()
export class MyTaskMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(MY_MAIN_MENU, { commandId: 'my-task.command' });
    }
}