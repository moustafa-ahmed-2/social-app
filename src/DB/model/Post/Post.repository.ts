import { IPost } from "../../../utils/interface";
import { AbstractRepository } from "../../abstract.repository";
import { Post } from "./Post.model";


export class PostRepository extends AbstractRepository<IPost>{

constructor(){
    super(Post)
}


}



