import { JsonRpcServer } from '@theia/core/lib/common/messaging';

export const BackendWithoutClient = Symbol('BackendWithoutClient');
export const WITHOUT_CLIENT_PATH = '/services/withoutClient';

export interface BackendWithoutClient extends JsonRpcServer<undefined> {
    greet(toGreet: string): Promise<string>
}
export const BackendWithClient = Symbol('BackendWithClient');
export const WITH_CLIENT_PATH = '/services/withClient';

export interface BackendWithClient extends JsonRpcServer<BackendClient> {
    greet(): Promise<string>
}
export const BackendClient = Symbol('BackendClient');
export interface BackendClient {
    toGreet(): Promise<string>;
}