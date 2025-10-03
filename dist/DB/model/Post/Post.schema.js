"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
const reaction_schema_1 = require("../common/reaction.schema");
const comment_model_1 = require("../../comment/comment.model");
exports.PostSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        trim: true
    },
    reactions: [reaction_schema_1.ReactionSchema]
}, {
    timestamps: true
});
exports.PostSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postId",
    ref: "Comment"
});
exports.PostSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    await comment_model_1.Comment.deleteMany({ postId: filter._id });
    next();
});
