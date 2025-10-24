"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.getSpecificPost = void 0;
const post_validation_graphql_1 = require("./post-validation.graphql");
const Post_repository_1 = require("../../../DB/model/Post/Post.repository");
const auth_graphql_middleware_1 = require("../../../middleware/authentication/auth.graphql.middleware");
const validation_graphql_middleware_1 = require("../../../middleware/authentication/validation-graphql.middleware");
const getSpecificPost = async (parent, args) => {
    const postRepo = new Post_repository_1.PostRepository();
    const post = await postRepo.getOne({ _id: args.id }, {}, { populate: [{ path: "userId" }] });
    if (!post)
        throw new Error("Post Not found");
    return {
        message: "done",
        success: true,
        data: post
    };
};
exports.getSpecificPost = getSpecificPost;
const getAllPosts = async (parent, args, context) => {
    await (0, auth_graphql_middleware_1.isAuthenticatedGraphql)(context);
    (0, validation_graphql_middleware_1.isValidGraphql)(post_validation_graphql_1.postValidation, args);
    const postRepo = new Post_repository_1.PostRepository();
    const post = await postRepo.getAll({ _id: args.id }, {}, { populate: [{ path: "userId" }] });
    if (!post)
        throw new Error("Post Not found");
    return {
        message: "done",
        success: true,
        data: post
    };
};
exports.getAllPosts = getAllPosts;
