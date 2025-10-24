import { postValidation } from './post-validation.graphql';

import { PostRepository } from "../../../DB/model/Post/Post.repository";
import { isAuthenticatedGraphql } from "../../../middleware/authentication/auth.graphql.middleware";
import { isValidGraphql } from "../../../middleware/authentication/validation-graphql.middleware";

export const getSpecificPost =  async (parent:any, args:any) => {
      const postRepo = new PostRepository();
      const post = await postRepo.getOne(
        { _id: args.id },
        {} ,
        {populate:[{path:"userId"}]}
    
    
    );
      if (!post) throw new Error("Post Not found");
      return {
        message:"done",
        success:true,
        data:post
      };
    }


    
export const getAllPosts = async (parent:any , args:any , context:any) => {

await isAuthenticatedGraphql(context);


 isValidGraphql(postValidation , args)

   const postRepo = new PostRepository();
      const post = await postRepo.getAll(
        { _id: args.id },
        {} ,
        {populate:[{path:"userId"}]}
    
    );
      if (!post) throw new Error("Post Not found");
      return {
        message:"done",
        success:true,
        data:post
      };



};
