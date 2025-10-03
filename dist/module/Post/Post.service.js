"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("./factory");
const Post_repository_1 = require("../../DB/model/Post/Post.repository");
const error_1 = require("../../utils/error");
const enum_1 = require("../../utils/common/enum");
class PostService {
    postFactoryService = new factory_1.PostFactoryService();
    postRepository = new Post_repository_1.PostRepository();
    create = async (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const createPostDTO = req.body;
        const post = await this.postFactoryService.createPost(createPostDTO, req.user);
        const createPost = await this.postRepository.create(post);
        return res.status(201).json({ message: "Post Created successfully", success: true, data: createPost });
    };
    addReaction = async (req, res) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const postExist = await this.postRepository.exist({ _id: id });
        if (!postExist)
            throw new error_1.NotFoundException("post not found");
        let userReactedIndex = postExist.reactions.findIndex((reaction) => {
            return reaction.userId.toString() == userId.toString();
        });
        if (userReactedIndex == -1) {
            await this.postRepository.update({ _id: id }, { $push: { reactions: { reaction: [null, undefined, ""].includes(reaction) ? enum_1.Reaction.like : reaction, userId } } });
        }
        else if ([undefined, null, ""].includes(reaction)) {
            this.postRepository.update({ _id: id }, { $pull: { reactions: postExist.reactions[userReactedIndex] } });
        }
        else {
            await this.postRepository.update({ _id: id, "reactions.userId": userId }, {
                "reactions.$.reaction": reaction
            });
        }
        return res.sendStatus(204);
    };
    getSpecific = async (req, res) => {
        const { id } = req.params;
        const post = await this.postRepository.getOne({ _id: id }, {}, {
            populate: [
                { path: "userId", select: "fullName firstName lastName" },
                { path: "reactions.userId" },
                { path: "comments", match: { parseInt: null } }
            ]
        });
        if (!post) {
            return res.status(404).json({ message: "Post not found", success: false });
        }
        return res.status(200).json({ message: "Post fetched successfully", data: post });
    };
    deletePost = async (req, res) => {
        const { id } = req.params;
        const postExist = await this.postRepository.exist({ _id: id });
        if (!postExist)
            throw new error_1.NotFoundException("Post Not Found");
    };
}
exports.default = new PostService;
