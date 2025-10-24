



import { model } from "mongoose";
import { friendSchema } from "./friend.schema";

export const friend = model("Friend" , friendSchema)