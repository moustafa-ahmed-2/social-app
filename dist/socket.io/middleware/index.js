"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAuh = void 0;
const user_repository_1 = require("../../DB/model/user/user.repository");
const error_1 = require("../../utils/error");
const token_1 = require("../../utils/token");
const socketAuh = async (socket, next) => {
    try {
        const { authorization } = socket.handshake.auth;
        const payload = (0, token_1.verifyToken)(authorization);
        const userRepository = new user_repository_1.UserRepository();
        const user = await userRepository.getOne({ _id: payload._id });
        if (!user)
            throw new error_1.NotFoundException("user not found");
        socket.data.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.socketAuh = socketAuh;
