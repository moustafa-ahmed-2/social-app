"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedGraphql = void 0;
const token_1 = require("../../utils/token");
const user_repository_1 = require("../../DB/model/user/user.repository");
const error_1 = require("../../utils/error");
const isAuthenticatedGraphql = async (context) => {
    const token = context.token;
    const payload = (0, token_1.verifyToken)(token);
    const userRepository = new user_repository_1.UserRepository();
    const user = await userRepository.exist({ _id: payload._id }, {}, { populate: [{ path: "friends", select: "fullName firstName lastName" }] });
    if (!user)
        throw new error_1.NotFoundException("User not found");
    context.user = user;
};
exports.isAuthenticatedGraphql = isAuthenticatedGraphql;
