/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as rpc from "@codingame/monaco-jsonrpc";
import { program } from "commander";
import * as cors from "cors";
import * as express from "express";
import * as fs from "fs";
import * as http from "http";
import * as net from "net";
import * as url from "url";
import * as ws from "ws";
import { launch } from "./json-server-launcher";

program
  .option("--external")
  .option("-p, --port <number>", "port number", "3000")
  .option("-sp, --server-path <string>", "server path", "sampleServer");

program.parse(process.argv);
const options = program.opts();

console.log("options", options);

process.on("uncaughtException", function (err: any) {
  console.error("Uncaught Exception: ", err.toString());
  if (err.stack) {
    console.error(err.stack);
  }
});

// create the express application
const app = express();
app.use(cors());
app.use(express.json());

// set builtins post
app.post("/builtins", (req, res) => {
  console.log("debug request body builtins", req.body);
  const flake8Path = `./.flake8`;
  const builtins = req.body;
  const flake8 = fs.readFileSync(flake8Path, {
    encoding: "utf-8",
  });
  const lines = flake8.split("\n").map((line) => {
    if (line.split("builtins").length > 1) {
      return `builtins = ${builtins
        .map((builtin: any) => builtin.label)
        .join(",")}`;
    }
    return line;
  });
  fs.writeFileSync(flake8Path, lines.join("\n"));
  res.sendStatus(200);
});

// start the server
const server = app.listen(options.port);
// create the web socket
const wss = new ws.Server({
  noServer: true,
  perMessageDeflate: false,
});
server.on(
  "upgrade",
  (request: http.IncomingMessage, socket: net.Socket, head: Buffer) => {
    const pathname = request.url ? url.parse(request.url).pathname : undefined;
    const serverPath = `/${options.serverPath}`;
    if (pathname === serverPath) {
      wss.handleUpgrade(request, socket, head, (webSocket) => {
        const socket: rpc.IWebSocket = {
          send: (content) =>
            webSocket.send(content, (error) => {
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
          launch(socket);
        } else {
          webSocket.on("open", () => launch(socket));
        }
      });
    }
  }
);
