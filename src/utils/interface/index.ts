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
















import { JwtPayload } from "jsonwebtoken";
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
}





declare module "express" {
  interface Request {
    user?: IUser; 
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
