"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
var auth_controller_1 = require("./module/auth/auth.controller");
var connection_1 = require("./DB/connection");
function bootstrap(app, express) {
    app.use(express.json());
    (0, connection_1.connectDB)();
    app.use("/auth", auth_controller_1.default);
    app.all("/{*dummy}", function (req, res, next) {
        return res.status(404).json({ message: "Invalid router", success: false });
    });
}
