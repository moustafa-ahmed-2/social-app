"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.generateHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateHash = async (plantext) => {
    return bcryptjs_1.default.hash(plantext, 10);
};
exports.generateHash = generateHash;
const compareHash = async (password, hashpassword) => {
    return bcryptjs_1.default.compare(password, hashpassword);
};
exports.compareHash = compareHash;
