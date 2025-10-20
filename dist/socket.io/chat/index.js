"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const message_repository_1 = require("../../DB/model/message/message.repository");
const chat_repository_1 = require("../../DB/model/chat/chat.repository");
const sendMessage = (socket, io, connectedUser) => {
    return async (data) => {
        const destSocket = connectedUser.get(data.destId);
        socket.emit("successMessage", data);
        if (!destSocket) {
            socket.emit("errorMessage", { message: "User not online" });
            return;
        }
        const sender = socket.data.user.id;
        io.to(destSocket).emit("receiveMessage", sender);
        const messageRepo = new message_repository_1.MessageRepository();
        const createdMessage = await messageRepo.create({ content: data.message, sender });
        const chatRepo = new chat_repository_1.ChatRepository();
        const chat = await chatRepo.getOne({ users: { $all: [sender, data.destId] } });
        if (!chat) {
            await chatRepo.create({
                users: [sender, data.destId],
                messages: [createdMessage._id],
            });
        }
        else {
            await chatRepo.update({ _id: chat._id }, {
                $push: { messages: createdMessage._id },
            });
        }
    };
};
exports.sendMessage = sendMessage;
