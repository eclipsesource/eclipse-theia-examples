import { Command, CommandHandler } from '@theia/core';
import { PreferenceService } from '@theia/core/lib/browser';
import { inject, injectable } from 'inversify';

export const ToggleCommand: Command = {
    id: 'CommandExample.toggle',
    label: 'Toggle state'
};

@injectable()
export class ToggleCommandHandler implements CommandHandler {
    private readonly EXAMPLE_TOGGLE_PREFERENCE: string = 'example.toggle-command';

    constructor(@inject(PreferenceService) private readonly preferenceService: PreferenceService) { }

    isToggled(): boolean {
        const toggled = this.preferenceService.get(this.EXAMPLE_TOGGLE_PREFERENCE);
        return toggled === 'on' || toggled === undefined;
    }

    execute(): void {
        this.preferenceService.set(this.EXAMPLE_TOGGLE_PREFERENCE, this.isToggled() ? 'off' : 'on');
    }
}