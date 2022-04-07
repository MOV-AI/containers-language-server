"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const ws = require("ws");
const url = require("url");
const express = require("express");
const json_server_launcher_1 = require("./json-server-launcher");
const commander_1 = require("commander");
commander_1.program
    .option("--external")
    .option("-p, --port <number>", "port number", "3000")
    .option("-sp, --server-path <string>", "server path", "sampleServer");
commander_1.program.parse(process.argv);
const options = commander_1.program.opts();
console.log("options", options);
process.on("uncaughtException", function (err) {
    console.error("Uncaught Exception: ", err.toString());
    if (err.stack) {
        console.error(err.stack);
    }
});
// create the express application
const app = express();
// start the server
const server = app.listen(options.port);
// create the web socket
const wss = new ws.Server({
    noServer: true,
    perMessageDeflate: false,
});
server.on("upgrade", (request, socket, head) => {
    const pathname = request.url ? url.parse(request.url).pathname : undefined;
    const serverPath = `/${options.serverPath}`;
    if (pathname === serverPath) {
        wss.handleUpgrade(request, socket, head, (webSocket) => {
            const socket = {
                send: (content) => webSocket.send(content, (error) => {
                    if (error) {
                        throw error;
                    }
                }),
                onMessage: (cb) => webSocket.on("message", cb),
                onError: (cb) => webSocket.on("error", cb),
                onClose: (cb) => webSocket.on("close", cb),
                dispose: () => webSocket.close(),
            };
            // launch the server when the web socket is opened
            if (webSocket.readyState === webSocket.OPEN) {
                json_server_launcher_1.launch(socket);
            }
            else {
                webSocket.on("open", () => json_server_launcher_1.launch(socket));
            }
        });
    }
});
//# sourceMappingURL=server.js.map