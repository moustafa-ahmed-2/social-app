"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const middleware_1 = require("./middleware");
const chat_1 = require("./chat");
const connectedUser = new Map();
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, { cors: {
            origin: "*"
        } });
    io.use(middleware_1.socketAuh);
    io.on("connection", (socket) => {
        connectedUser.set(socket.data.user.id, socket.id);
        console.log("new user connected");
        socket.on("sendMessage", (0, chat_1.sendMessage)(socket, io, connectedUser));
    });
};
exports.initSocket = initSocket;
