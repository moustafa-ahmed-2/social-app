

import express, { Express } from "express";
import { log } from "console";
import { bootstrap } from "./app.controller";
import { config } from "dotenv";

config({path:"./config/dev.env"})

const app: Express = express();
const port = 3000;

bootstrap(app, express);

app.listen(port, () => {
  log("Server is running on port", port);
});

