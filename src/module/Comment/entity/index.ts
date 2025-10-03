import { ObjectId } from "mongoose";
import { Iattachments, IReaction } from "../../../utils/interface";





export interface Comment{
 _id:ObjectId ,
  userId:ObjectId,
  postId:ObjectId,
  parentId:ObjectId
  content?:string,
  attachments?:Iattachments,
  Reaction:IReaction[],
  mentions?:ObjectId


}
