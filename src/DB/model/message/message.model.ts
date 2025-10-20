import { model } from "mongoose";
import { MessageSchema } from "./message.schema";

export const Message = model("Message" , MessageSchema)