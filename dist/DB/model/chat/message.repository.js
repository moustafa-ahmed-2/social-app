"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const abstract_repository_1 = require("../../abstract.repository");
const chat_model_1 = require("./chat.model");
class MessageRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(chat_model_1.Message);
    }
}
exports.MessageRepository = MessageRepository;
