"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactoryService = void 0;
const Entity_1 = require("../Entity");
class PostFactoryService {
    createPost(createPostDTO, user) {
        const newPost = new Entity_1.Post();
        newPost.content = createPostDTO.content;
        newPost.userId = user._id;
        newPost.reactions = [];
        newPost.attachments = [];
        return newPost;
    }
}
exports.PostFactoryService = PostFactoryService;
