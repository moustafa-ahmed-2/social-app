"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const reaction_schema_1 = require("./../model/common/reaction.schema");
const mongoose_1 = require("mongoose");
exports.commentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
    },
    content: { type: String },
    Reaction: { ReactionSchema: reaction_schema_1.ReactionSchema }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
exports.commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentId"
});
exports.commentSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    const replies = await this.model.find({ parentId: filter._id });
    if (replies.length) {
        for (const reply of replies) {
            this.model.deleteOne({ _id: reply._id });
        }
    }
    next();
});
