"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const Post_schema_1 = require("./Post.schema");
exports.Post = (0, mongoose_1.model)("Post", Post_schema_1.PostSchema);
