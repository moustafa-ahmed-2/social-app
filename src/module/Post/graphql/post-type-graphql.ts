import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { PostRepository } from "../../../DB/model/Post/Post.repository";




export const PostType =  {
    
    args: { id: { type: GraphQLID } },
    resolve: async (parent:any, args:any) => {
      const postRepo = new PostRepository();
      const post = await postRepo.getOne(
        { _id: args.id },
        {} ,
        {populate:[{path:"userId"}]}
    
    
    );
      if (!post) throw new Error("Post Not found");
      return post;
    }
  }







