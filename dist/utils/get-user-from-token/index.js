"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromToken = void 0;
const token_1 = require("../token");
const getUserIdFromToken = (req) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.warn(" No token provided");
            return null;
        }
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;
        if (!token) {
            console.warn(" Token is empty");
            return null;
        }
        const decoded = (0, token_1.verifyToken)(token);
        if (!decoded || !decoded._id) {
            console.warn(" Invalid token payload");
            return null;
        }
        return decoded._id;
    }
    catch (error) {
        console.error(" Error decoding token:", error);
        return null;
    }
};
exports.getUserIdFromToken = getUserIdFromToken;
