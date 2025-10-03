"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const auth_controller_1 = __importDefault(require("./module/auth/auth.controller"));
const connection_1 = require("./DB/connection");
const user_controller_1 = __importDefault(require("./module/user/user.controller"));
const Post_controller_1 = __importDefault(require("./module/Post/Post.controller"));
const comment_controller_1 = __importDefault(require("./module/Comment/comment.controller"));
function bootstrap(app, express) {
    app.use(express.json());
    (0, connection_1.connectDB)();
    app.use("/auth", auth_controller_1.default);
    app.use("/user", user_controller_1.default);
    app.use("/post", Post_controller_1.default);
    app.use("/comment", comment_controller_1.default);
    app.use((error, req, res, next) => {
        const status = Number.isInteger(error?.statusCode) ? error.statusCode : 500;
        return res.status(status).json({
            message: error.message || "Internal Server Error",
            success: false,
            errorDetails: error.errorDetails || null,
        });
    });
    app.all("/{*dummy}", (req, res, next) => {
        return res.status(404).json({ message: "Invalid router", success: false });
    });
}
