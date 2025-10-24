


import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/token";
import { UserRepository } from "../../DB/model/user/user.repository";
import { NotFoundException } from "../../utils/error";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const isAuthenticatedGraphql = async (context:any) => {
 
    const token = context.token ;

    // if (!token) {
    //   return res
    //     .status(401)
    //     .json({ message: "No token provided", success: false });
    // }

    const payload = verifyToken(token);
    const userRepository = new UserRepository();

    const user = await userRepository.exist(
      { _id: payload._id },
      {},
      { populate: [{ path: "friends", select: "fullName firstName lastName" }] }
    );

    if (!user) throw new NotFoundException("User not found");

   context.user = user;

 
};
