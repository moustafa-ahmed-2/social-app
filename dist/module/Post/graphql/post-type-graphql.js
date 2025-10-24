"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostType = void 0;
const graphql_1 = require("graphql");
const Post_repository_1 = require("../../../DB/model/Post/Post.repository");
exports.PostType = {
    args: { id: { type: graphql_1.GraphQLID } },
    resolve: async (parent, args) => {
        const postRepo = new Post_repository_1.PostRepository();
        const post = await postRepo.getOne({ _id: args.id }, {}, { populate: [{ path: "userId" }] });
        if (!post)
            throw new Error("Post Not found");
        return post;
    }
};
