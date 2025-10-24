
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { PostRepository } from "../../../DB/model/Post/Post.repository.js";
import { userType } from "../../user/graphql/user-type.graphql.js";
import { getAllPosts, getSpecificPost } from "./post-services.graphql.js";


const PostType = new GraphQLObjectType({
  name: "Post",
  fields: {
    _id: { type: GraphQLID },
    content: { type: GraphQLString },
    userId: { type:userType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  }
});

export const postQuery = {   //postResponse
  getPost: {
    type: new GraphQLObjectType({
        name:"getPostResponse",
        fields:{
            message:{type:GraphQLString},
            success:{type:GraphQLBoolean},
            data:{type:PostType}
        }
    }),
    args: { id: { type: GraphQLID } },
    resolve:getSpecificPost
  },


  // Get all posts
  getPosts: {
    type: new GraphQLObjectType({
      name: "getPostsResponse",
      fields: {
        message: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        data: { type: new GraphQLList(PostType) },
      },
    }),
    resolve: getAllPosts,
  },






  
};









