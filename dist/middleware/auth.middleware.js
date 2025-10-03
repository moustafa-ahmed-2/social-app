"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const token_1 = require("../utils/token");
const user_repository_1 = require("../DB/model/user/user.repository");
const error_1 = require("../utils/error");
const isAuthenticated = () => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: "No token provided", success: false });
            }
            const payload = (0, token_1.verifyToken)(token);
            const userRepository = new user_repository_1.UserRepository();
            const user = await userRepository.exist({ _id: payload._id });
            if (!user)
                throw new error_1.NotFoundException("user not found");
            req.user = user;
            next();
        }
        catch (error) {
            console.error("❌ Auth error:", error);
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
    };
};
exports.isAuthenticated = isAuthenticated;
