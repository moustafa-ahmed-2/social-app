import { IUser } from "../../../utils/interface";
import { Post } from "../Entity";
import { CreatePostDTO } from "../Post.dto";



export class PostFactoryService{


createPost(createPostDTO:CreatePostDTO , user:IUser   ){

const newPost = new Post();
newPost.content = createPostDTO.content;
newPost.userId = user._id;
newPost.reactions = [];
newPost.attachments = []


return newPost

}





}

