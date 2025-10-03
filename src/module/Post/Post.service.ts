import { Request, Response } from "express";
import { CreatePostDTO } from "./Post.dto";
import { PostFactoryService } from "./factory";
import { PostRepository } from "../../DB/model/Post/Post.repository";
import { NotAuthorizedException, NotFoundException } from "../../utils/error";
import { Reaction } from "../../utils/common/enum";






class PostService{

    private readonly postFactoryService = new PostFactoryService()
    private readonly postRepository = new PostRepository()

public create =async (req:Request , res:Response)=>{


 if (!req.user) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }


const createPostDTO:CreatePostDTO = req.body

 const post =  await this.postFactoryService.createPost(createPostDTO , req.user)

 const createPost = await  this.postRepository.create(post)

return res.status(201).json({message:"Post Created successfully" , success:true , data:createPost })

}


public addReaction = async (req:Request , res:Response)=>{

const{id} = req.params;
const {reaction} = req.body;
const userId = req.user?._id;

 if (!userId) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }

const postExist = await this.postRepository.exist({_id:id})

if(!postExist) throw new NotFoundException("post not found")


    let userReactedIndex = postExist.reactions.findIndex((reaction)=>{
        return reaction.userId.toString()  == userId.toString() 
    })

if(userReactedIndex == -1){
    await this.postRepository.update(
      { _id: id },
      { $push: { reactions: { reaction:[null,undefined,""].includes(reaction)?Reaction.like : reaction , userId } } }
    );

} else if   (  [undefined , null , ""].includes(reaction)     ){

this.postRepository.update({_id:id} , 
    {$pull:{reactions:postExist.reactions[userReactedIndex]}}     )

}



else{
    await this.postRepository.update({_id:id , "reactions.userId":userId    } 
        , {
            "reactions.$.reaction":reaction
        })
}






return res.sendStatus(204)

}

public getSpecific = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await this.postRepository.getOne(
    { _id: id }, 
    {},         
    {            // options
      populate: [
        { path: "userId", select: "fullName firstName lastName" },
        { path: "reactions.userId" },
        { path: "comments" , match:{parseInt:null} }
      ]
    }
  );

  if (!post) {
    return res.status(404).json({ message: "Post not found", success: false });
  }

  return res.status(200).json({ message: "Post fetched successfully", data: post });
};


public deletePost = async (req:Request , res:Response  )=>{
const {id} = req.params;
const postExist = await this.postRepository.exist({_id:id});
if(!postExist) throw new NotFoundException("Post Not Found") 

// if(postExist.userId.toString()  != req.user.id  ){
// throw new NotAuthorizedException("You are not authorized this post") 
// }


}




}



export default new PostService