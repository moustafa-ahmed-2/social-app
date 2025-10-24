"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const auth_controller_1 = __importDefault(require("./module/auth/auth.controller"));
const connection_1 = require("./DB/connection");
const cors_1 = __importDefault(require("cors"));
const user_controller_1 = __importDefault(require("./module/user/user.controller"));
const Post_controller_1 = __importDefault(require("./module/Post/Post.controller"));
const comment_controller_1 = __importDefault(require("./module/Comment/comment.controller"));
const chat_controller_1 = __importDefault(require("./module/chat/chat.controller"));
const express_1 = require("graphql-http/lib/use/express");
const app_schema_1 = require("./app.schema");
const graphql_1 = require("graphql");
function bootstrap(app, express) {
    app.use(express.json());
    (0, connection_1.connectDB)();
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use("/auth", auth_controller_1.default);
    app.use("/user", user_controller_1.default);
    app.use("/post", Post_controller_1.default);
    app.use("/comment", comment_controller_1.default);
    app.use("/chat", chat_controller_1.default);
    app.all("/graphql", (0, express_1.createHandler)({
        schema: app_schema_1.appSchema,
        formatError: ((err) => {
            const error = err instanceof graphql_1.GraphQLError ? err : new graphql_1.GraphQLError(err.message || "Unknown error");
            return {
                message: error.message,
                path: error.path,
                locations: error.locations,
            };
        }),
        context: ((req) => {
            const request = req;
            const token = request.headers.authorization || null;
            return { token };
        }),
    }));
}
