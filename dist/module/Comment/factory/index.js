"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentFactoryService = void 0;
const mongodb_1 = require("mongodb");
class CommentFactoryService {
    createComment(createCommentDTO, user, post, comment, parentId) {
        const newComment = {
            _id: new mongodb_1.ObjectId(),
            userId: user._id,
            postId: post._id || comment?.postId,
            parentId: comment ? comment._id : null,
            content: createCommentDTO.content,
            attachments: createCommentDTO.attachment,
            Reaction: [],
        };
        return newComment;
    }
}
exports.CommentFactoryService = CommentFactoryService;
