import { Schema } from "mongoose";
import { IMessage } from "../../../utils/interface";

export const MessageSchema = new Schema<IMessage>(
    {
        content:String ,
        sender:{type:Schema.Types.ObjectId , ref:"User"}
    } ,
     {
    timestamps:true
})