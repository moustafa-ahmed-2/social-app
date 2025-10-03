"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const abstract_repository_1 = require("../../abstract.repository");
const Post_model_1 = require("./Post.model");
class PostRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(Post_model_1.Post);
    }
}
exports.PostRepository = PostRepository;
