/**
 * Generated using theia-extension-generator
 */
import { LabelProviderContribution } from "@theia/core/lib/browser";
import { ContainerModule } from "inversify";
import { MyLabelProviderContribution } from './label-contribution';
import '../../src/browser/style/example.css';

export default new ContainerModule(bind => {
    // label binding
    bind(LabelProviderContribution).to(MyLabelProviderContribution);
});