

import { Request } from "express";

import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../token";


export const getUserIdFromToken = (req: Request): string | null => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.warn(" No token provided");
      return null;
    }

 
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;


    if (!token) {
      console.warn(" Token is empty");
      return null;
    }

    const decoded = verifyToken(token) as JwtPayload;

    if (!decoded || !decoded._id) {
      console.warn(" Invalid token payload");
      return null;
    }

    return decoded._id;
  } catch (error) {
    console.error(" Error decoding token:", error);
    return null;
  }
};

