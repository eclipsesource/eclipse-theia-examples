import { Command, MessageService } from '@theia/core';
import { PreferenceService } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { SingleUriCommandHandler } from '@theia/core/lib/common/uri-command-handler';
import { inject, injectable } from 'inversify';

export const ClickCommand: Command = {
    id: 'CommandExample.click',
    label: 'Say Hello',
    iconClass: 'my-icon my-item'
};

@injectable()
export class ClickCommandHandler implements SingleUriCommandHandler {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
        @inject(PreferenceService) private readonly preferenceService: PreferenceService
    ) { }

    execute(uri: URI): void {
        const toggled = this.preferenceService.get('example.toggle-command');;
        let message = 'Hello World';
        if (toggled === 'on' || toggled === undefined) {
            message += ' from ' + uri.displayName;
        }
        this.messageService.info(message);
    }
    isEnabled(uri: URI): boolean {
        return uri.path.ext === '.my';
    }
}