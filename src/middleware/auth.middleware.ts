
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import { UserRepository } from "../DB/model/user/user.repository";
import { NotFoundException } from "../utils/error";
import z from "zod";



export const isAuthenticated = ()=>{
    return async (req:Request , res:Response , next:NextFunction)=>{

        try {
            
 const token = req.headers.authorization as string
   if (!token) {
        return res.status(401).json({ message: "No token provided", success: false });
      }

 const payload =    verifyToken(token);
const userRepository = new UserRepository();


const user = await userRepository.exist({_id:payload._id} , {} ,
   {populate:[{path:"friends" , select:"fullName firstName lastName"}]}) 
if(!user) throw new NotFoundException("user not found")
req.user = user;

next();

            
        } catch (error) {
  console.error(" Auth error:", error);
  return res.status(401).json({ message: "Unauthorized", success: false });
}


}



}





export const createValidationSchema = <T extends z.ZodRawShape>(schema: T) => {
  return z.object(schema);
};




























