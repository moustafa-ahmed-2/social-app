import { model } from "mongoose";
import { PostSchema } from "./Post.schema";


export const Post = model("Post" , PostSchema);
