"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockUserValidation = exports.friendIDValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
exports.friendIDValidation = (0, auth_middleware_1.createValidationSchema)({
    friendId: zod_1.default.string(),
});
exports.blockUserValidation = (0, auth_middleware_1.createValidationSchema)({
    userId: zod_1.default.string(),
});
