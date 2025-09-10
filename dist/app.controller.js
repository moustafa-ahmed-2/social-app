"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const auth_controller_1 = __importDefault(require("./module/auth/auth.controller"));
const connection_1 = require("./DB/connection");
function bootstrap(app, express) {
    app.use(express.json());
    (0, connection_1.connectDB)();
    app.use("/auth", auth_controller_1.default);
    app.all("/{*dummy}", (req, res, next) => {
        return res.status(404).json({ message: "Invalid router", success: false });
    });
}
