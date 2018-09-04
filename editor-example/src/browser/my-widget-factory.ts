import { SelectionService } from '@theia/core';
import { LabelProvider, NavigatableWidgetOptions, WidgetFactory } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { EditorWidget, TextEditorProvider } from '@theia/editor/lib/browser';
import { inject, injectable } from 'inversify';
import { MyWidget } from './my-widget';

@injectable()
export class MyWidgetFactory implements WidgetFactory {

    static ID = 'my-editor-opener';

    readonly id = MyWidgetFactory.ID;
    constructor(
        @inject(LabelProvider) private readonly labelProvider: LabelProvider,
        @inject(TextEditorProvider) private readonly editorProvider: TextEditorProvider,
        @inject(SelectionService) private readonly selectionService: SelectionService
    ) { }

    createWidget(options: NavigatableWidgetOptions): Promise<EditorWidget> {
        const uri = new URI(options.uri);
        return this.createEditor(uri);
    }

    protected async createEditor(uri: URI): Promise<EditorWidget> {
        const icon = await this.labelProvider.getIcon(uri);
        return this.editorProvider(uri).then(textEditor => {
            const newEditor = new MyWidget(textEditor, this.selectionService);
            newEditor.id = this.id + ':' + uri.toString();
            newEditor.title.closable = true;
            newEditor.title.label = 'My Editor for ' + this.labelProvider.getName(uri);
            newEditor.title.iconClass = icon + ' my-tab';
            newEditor.title.caption = 'My description for ' + this.labelProvider.getLongName(uri);
            return newEditor;
        });
    }
}