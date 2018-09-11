import { injectable } from "inversify";
import { BackendClient, BackendWithClient } from "../common/protocol";

@injectable()
export class BackendWithClientServer implements BackendWithClient {
    private client?: BackendClient;
    greet(): Promise<string> {
        return new Promise<string>((resolve, reject) =>
            this.client ? this.client.toGreet().then(greet => resolve('Hello ' + greet))
                : reject('No Client'));
    }
    dispose(): void {
        // do nothing
    }
    setClient(client: BackendClient): void {
        this.client = client;
    }


}