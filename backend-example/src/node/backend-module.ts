/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ConnectionHandler, JsonRpcConnectionHandler } from "@theia/core";
import { ContainerModule } from "inversify";
import { BackendClient, BackendWithClient, BackendWithoutClient, WITHOUT_CLIENT_PATH, WITH_CLIENT_PATH } from "../common/protocol";
import { BackendWithClientServer } from "./backend-with-client";
import { BackendWithoutClientServer } from "./backend-without-client";

export default new ContainerModule(bind => {
    bind(BackendWithoutClient).to(BackendWithoutClientServer).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler(WITHOUT_CLIENT_PATH, () => {
            return ctx.container.get<BackendWithoutClient>(BackendWithoutClient);
        })
    ).inSingletonScope();

    bind(BackendWithClient).to(BackendWithClientServer).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler<BackendClient>(WITH_CLIENT_PATH, client => {
            const server = ctx.container.get<BackendWithClient>(BackendWithClient);
            server.setClient(client);
            client.onDidCloseConnection(() => server.dispose());
            return server;
        })
    ).inSingletonScope();
});


