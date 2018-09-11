import { injectable } from "inversify";
import { BackendWithoutClient } from "../common/protocol";

@injectable()
export class BackendWithoutClientServer implements BackendWithoutClient {
    greet(toGreet: string): Promise<string> {
        return new Promise<string>(resolve => resolve('Hello ' + toGreet));
    }
    dispose(): void {
        // do nothing
    }
    setClient(client: undefined): void {
        // do nothing
    }


}