// import { JwtPayload } from "jsonwebtoken";
// import { GENDER, Reaction, SYS_ROLE, USER_AGENT } from "../common/enum";
// import { ObjectId } from "mongoose";


 
// export  interface IUser{

// firstName:string ; 
// lastName:string ;
// fullName ? : string ; //virtual
// password?:string ;
// email:string;
// phoneNumber? :string ;
// credentialUpdatedAt: Date;
// role:  SYS_ROLE;
// gender: GENDER ;
// userAgent: USER_AGENT;
// otp?:string,
// otpExpiryAt?:string,
// isVerified:boolean;
//      _id:ObjectId


// }

// // export interface IUser{


// // }

// // export interface Ipayload extends JwtPayload {
// //     _id:string
// //     role:string
// // }

// declare module "express"{
//     interface Request{
//         user:IUser
        
//     }
// }
// declare module "jsonwebtoken"{
//     interface JwtPayload{
//        _id:string,
//        role:string
        
//     }
// }




// export interface Iattachments{
//     url:string,
//     id:string
// }

// export interface IReaction{
//     reaction:Reaction ,
//     userId:ObjectId
// }

// export interface IPost{

// userId:ObjectId ;
// content:string,
// reactions:  IReaction[];
// attachments:Iattachments[]


// }















import { GENDER, Reaction, SYS_ROLE, USER_AGENT } from "../common/enum";
import { ObjectId, Types } from "mongoose";

export interface IUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  fullName?: string; // virtual
  password?: string;
  email: string;
  phoneNumber?: string;
  credentialUpdatedAt?: Date;
  role: SYS_ROLE;
  gender: GENDER;
  userAgent: USER_AGENT;
  otp?: string;
  otpExpiryAt?: string;
  isVerified: boolean;
  friends:ObjectId[]
}


export interface IMessage{
  content:string
  sender:ObjectId
  attachments?:Iattachments[]
  reaction?:IReaction[]
}

export interface IChat{
  users:ObjectId[];
  messages:ObjectId[]
}






// types/express.d.ts
import { Request } from "express";

// declare module "express-serve-static-core" {
//   interface Request {
//     user?: {
//       _id: string;
//       role?: string;
//       email?: string;
//     };
//   }
// }



declare module "express" {
  interface Request {
    user?: Partial<IUser>; // بدل IUser كامل
   
  }
}

// declare module "express" {
//   interface Request {
//     user?: Partial<IUser>;
//   }
// }




import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload | any; // لو بتضيف req.user في auth middleware
      params: {
        userId?: string;
        [key: string]: string | undefined;
      };
    }
  }
}




export interface IComment{
  _id:Types.ObjectId,
  userId:ObjectId,
  postId:ObjectId,
  parentId:Types.ObjectId | null,
  content:string,
  attachments:Iattachments,
  Reaction:IReaction[],
  mentions?:ObjectId


}


declare module "jsonwebtoken" {
  interface JwtPayload {
    _id: string;
    role: string;
  }
}

export interface Iattachments {
  url: string;
  id: string;
}

export interface IReaction {
  reaction: Reaction;
  userId: ObjectId;
}

export interface IPost {
  _id:ObjectId;
  userId: ObjectId;
  content: string;
  reactions: IReaction[];
  attachments: Iattachments[];
}




declare module "graphql"{
  interface GraphQLError{
    message:string , 
    success:boolean,
    errorDetails:any,
    errMessages:any
  }
}


export interface IFriend extends Document {
  user: mongoose.Types.ObjectId;
  friend: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "blocked";
}
