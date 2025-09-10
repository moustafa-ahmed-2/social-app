"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var console_1 = require("console");
var app_controller_1 = require("./app.controller");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: "./config/dev.env" });
var app = (0, express_1.default)();
var port = 3000;
(0, app_controller_1.bootstrap)(app, express_1.default);
app.listen(port, function () {
    (0, console_1.log)("Server is running on port", port);
});
