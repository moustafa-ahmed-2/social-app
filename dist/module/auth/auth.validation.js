"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const enum_1 = require("../../utils/common/enum");
const zod_1 = __importDefault(require("zod"));
exports.registerSchema = zod_1.default.object({
    fullName: zod_1.default.string().min(2).max(20),
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
    phoneNumber: zod_1.default.string(),
    Gender: zod_1.default.enum(enum_1.GENDER)
});
