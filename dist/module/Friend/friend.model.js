"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friend = void 0;
const mongoose_1 = require("mongoose");
const friend_schema_1 = require("./friend.schema");
exports.friend = (0, mongoose_1.model)("Friend", friend_schema_1.friendSchema);
