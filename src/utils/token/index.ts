

import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { devConfig } from "../../config/env/dev.config.";



export const generateToken = ({ payload, secretKey = devConfig.JET_SECRET as string , options }: {
     payload: object;
  secretKey?: string;
  options?: SignOptions;

}) => {
  return jwt.sign(payload, secretKey, options);
};




export const verifyToken = (
    token:string ,
     secretKey:string  = devConfig.JET_SECRET || "fallback secret"  )=>{

return jwt.verify(token , secretKey)   as JwtPayload

}