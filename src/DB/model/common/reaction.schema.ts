
import { Schema } from "mongoose";
import { Reaction } from "../../../utils/common/enum";
import { IReaction } from "../../../utils/interface";






export const ReactionSchema = new Schema<IReaction>(
    {
   
        reaction:{
            type:Number,
            enum:Reaction , 
            default:Reaction.like
        },
        userId:{
            type:Schema.Types.ObjectId ,
            ref:"User",
            required:true
        },



    } ,
    {timestamps:true}
)
