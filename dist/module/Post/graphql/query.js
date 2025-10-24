"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postQuery = void 0;
const graphql_1 = require("graphql");
const user_type_graphql_js_1 = require("../../user/graphql/user-type.graphql.js");
const post_services_graphql_js_1 = require("./post-services.graphql.js");
const PostType = new graphql_1.GraphQLObjectType({
    name: "Post",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        content: { type: graphql_1.GraphQLString },
        userId: { type: user_type_graphql_js_1.userType },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString }
    }
});
exports.postQuery = {
    getPost: {
        type: new graphql_1.GraphQLObjectType({
            name: "getPostResponse",
            fields: {
                message: { type: graphql_1.GraphQLString },
                success: { type: graphql_1.GraphQLBoolean },
                data: { type: PostType }
            }
        }),
        args: { id: { type: graphql_1.GraphQLID } },
        resolve: post_services_graphql_js_1.getSpecificPost
    },
    getPosts: {
        type: new graphql_1.GraphQLObjectType({
            name: "getPostsResponse",
            fields: {
                message: { type: graphql_1.GraphQLString },
                success: { type: graphql_1.GraphQLBoolean },
                data: { type: new graphql_1.GraphQLList(PostType) },
            },
        }),
        resolve: post_services_graphql_js_1.getAllPosts,
    },
};
