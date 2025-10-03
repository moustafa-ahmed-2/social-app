

import { Request, Response } from "express";
import { PostRepository } from "../../DB/model/Post/Post.repository";
import { NotFoundException } from "../../utils/error";
import { CommentRepository } from "../../DB/comment/comment.repository";
import { IComment, IUser } from "../../utils/interface";
import { CommentFactoryService } from "./factory";
import { CreateCommentDTO } from "./Comment.dto";
import { success } from "zod";

class CommentService {
  private readonly postRepository = new PostRepository();
  private readonly commentRepository =  new CommentRepository()
  private readonly commentFactoryService = new CommentFactoryService()

   public create = async (req: Request, res: Response)=> {
    const { postId , id } = req.params;
 const createCommentDTO:CreateCommentDTO = req.body
    const postExist = await this.postRepository.exist({ _id: postId });
    if (!postExist) throw new NotFoundException("Post not found");


let  commentExist:IComment | any = undefined 

 if(id){
     commentExist = await this.commentRepository.exist({_id:id});
     if (!commentExist) throw new NotFoundException("Comment not found");
 }
const comment =   this.commentFactoryService.createComment(createCommentDTO 
    , req.user as IUser ,
     postExist , commentExist)

const createComment = await this.commentRepository.create(comment)

     return res.status(201).json({message:"comments created successfuly" ,  data:{createComment} })

  }

  public getSpecific =async (req:Request , res:Response)=>{

  const {id} = req.params;
  const commentExist = await this.commentRepository.exist(
    {_id:id},
     {} ,
     {populate:[{path:"replies"}]}  
  
  )
   if(!commentExist)throw new NotFoundException("comment Not found") 

 return res.status(200).json({
  message:"comment fetched successfully",
  success:true,
  data:{commentExist}
 })


}

public deleteComment = async (req:Request , res:Response)=>{

const {id} = req.params

const commentExist = await this.commentRepository.exist({_id:id});
if(!commentExist) throw new NotFoundException("comment not found")



 await this.commentRepository.delete({_id:id});

return res.status(200).json({
  message:"comment deleted successfully",
  success:true
})


}






}

export default new CommentService