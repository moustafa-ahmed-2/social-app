"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Post_repository_1 = require("../../DB/model/Post/Post.repository");
const error_1 = require("../../utils/error");
const comment_repository_1 = require("../../DB/comment/comment.repository");
const factory_1 = require("./factory");
class CommentService {
    postRepository = new Post_repository_1.PostRepository();
    commentRepository = new comment_repository_1.CommentRepository();
    commentFactoryService = new factory_1.CommentFactoryService();
    create = async (req, res) => {
        const { postId, id } = req.params;
        const createCommentDTO = req.body;
        const postExist = await this.postRepository.exist({ _id: postId });
        if (!postExist)
            throw new error_1.NotFoundException("Post not found");
        let commentExist = undefined;
        if (id) {
            commentExist = await this.commentRepository.exist({ _id: id });
            if (!commentExist)
                throw new error_1.NotFoundException("Comment not found");
        }
        const comment = this.commentFactoryService.createComment(createCommentDTO, req.user, postExist, commentExist);
        const createComment = await this.commentRepository.create(comment);
        return res.status(201).json({ message: "comments created successfuly", data: { createComment } });
    };
    getSpecific = async (req, res) => {
        const { id } = req.params;
        const commentExist = await this.commentRepository.exist({ _id: id }, {}, { populate: [{ path: "replies" }] });
        if (!commentExist)
            throw new error_1.NotFoundException("comment Not found");
        return res.status(200).json({
            message: "comment fetched successfully",
            success: true,
            data: { commentExist }
        });
    };
    deleteComment = async (req, res) => {
        const { id } = req.params;
        const commentExist = await this.commentRepository.exist({ _id: id });
        if (!commentExist)
            throw new error_1.NotFoundException("comment not found");
        await this.commentRepository.delete({ _id: id });
        return res.status(200).json({
            message: "comment deleted successfully",
            success: true
        });
    };
}
exports.default = new CommentService;
