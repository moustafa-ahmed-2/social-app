"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.Schema({
    content: String,
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
});
