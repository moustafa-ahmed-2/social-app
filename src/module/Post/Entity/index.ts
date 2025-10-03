// import { ObjectId } from "mongoose";
// import { Iattachments, IPost, IReaction } from "../../../utils/interface";



// export class Post {

// userId!:ObjectId ; 
// content!:string ;
// reactions!:IReaction[];
// attachments!:Iattachments[]


// }






import { ObjectId } from "mongoose";
import { Iattachments, IReaction, IPost } from "../../../utils/interface";

export class Post implements IPost {
  userId!: ObjectId; 
  content!: string;
  reactions!: IReaction[];
  attachments!: Iattachments[];
}
