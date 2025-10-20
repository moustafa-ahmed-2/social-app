

import express, { Express } from "express";
import { log } from "console";
import { bootstrap } from "./app.controller";
import { config } from "dotenv";
import { Server } from "socket.io";
import { initSocket } from "./socket.io";

config()

const app: Express = express();
const port = 3000;

bootstrap(app, express);

const server = app.listen(port, () => {
  log("Server is running on port", port);
});



initSocket(server)
