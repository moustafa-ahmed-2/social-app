

import mongoose, { Schema } from "mongoose";
import { IFriend } from "../../utils/interface";


 export const friendSchema = new Schema<IFriend>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    friend: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted", "blocked"], default: "pending" },
  },
  { timestamps: true }
);

export const FriendModel = mongoose.model<IFriend>("Friend", friendSchema);
