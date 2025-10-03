
// import { IComment, IPost, IUser } from "../../../utils/interface";
// import { CreateCommentDTO } from "../Comment.dto";
// import { Comment as CommentEntity} from "../entity";


// export class CommentFactoryService{

//     createComment(createCommentDTO:CreateCommentDTO , user:IUser , post:IPost , comment:IComment   ){

//   const newcomment = new Comment();

//   const parentsId  =comment.parentIds; 
//   newcomment.content = createCommentDTO().content;
//   newcomment.userId = user._id,
//   newcomment.postId = post._id,
//   newcomment.parentsId = parentsId,
//   newcomment.parentsId.push(comment._id) ,
//   newcomment.reactions = [];

//   return newcomment

 
//     }




// }










import { ObjectId } from "mongodb";
import { IComment, IPost, IUser } from "../../../utils/interface";
import { CreateCommentDTO } from "../Comment.dto";

export class CommentFactoryService {
  createComment(
    createCommentDTO: CreateCommentDTO,
    user: IUser,
    post: IPost,
    comment?:IComment,
    parentId?: IComment
  ): IComment {
    const newComment: IComment = {
      _id: new ObjectId(),
      userId: user._id,
      postId: post._id ||comment?.postId,
    parentId: comment ? comment._id : null,

      content: createCommentDTO.content,
      attachments: createCommentDTO.attachment,
      Reaction: [],
    
    };

    return newComment;
  }
}
