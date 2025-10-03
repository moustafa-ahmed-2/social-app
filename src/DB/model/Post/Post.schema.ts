import { Schema } from "mongoose"
import { IPost, IReaction } from "../../../utils/interface"
import { Reaction } from "../../../utils/common/enum"
import { ReactionSchema } from "../common/reaction.schema"
import { Comment } from "../../comment/comment.model"








export const PostSchema = new Schema<IPost>({

userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
},
content:{
    type:String,
    trim:true
    
},
reactions:[ReactionSchema]







},{
    timestamps:true
})


PostSchema.virtual("comments",{
    localField:"_id",
    foreignField:"postId",
    ref:"Comment"
})



PostSchema.pre("deleteOne" , async function(next){
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {}

await Comment.deleteMany({postId: filter._id})

next()
}   )

