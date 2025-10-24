


import { Request, Response } from "express";

import { ConflictException, NotFoundException } from "../../utils/error";


import { AddFriendDTO, BlockUserDTO } from "./friend.dto";

import { FRIENDS_STATUS_ENUM } from "../../utils/common/enum";
import { getUserIdFromToken } from "../../utils/get-user-from-token";
import { FriendRepository } from "./Friend.repository";

class FriendService {
  private friendRepository = new FriendRepository(); 

  blockUser = async (req: Request, res: Response) => {
    const _id = getUserIdFromToken(req);
    const blockUserDTO: BlockUserDTO = req.body;

    if (blockUserDTO.userId.toString() === _id?.toString()) {
      throw new ConflictException("You can't block yourself");
    }

    const alreadyBlocked = await this.friendRepository.isExists({
      userId: _id,
      friendId: blockUserDTO.userId,
      isBlocked: true,
    });

    if (alreadyBlocked) {
      throw new ConflictException("User already blocked");
    }

    await this.friendRepository.updateOne(
      { userId: _id, friendId: blockUserDTO.userId },
      {
        status: FRIENDS_STATUS_ENUM.ACCEPTED,
        isBlocked: true,
        blockedAt: new Date(),
      },
      
    );

    res.status(201).json({
      success: true,
      message: "User blocked successfully",
    });
  };

  addFriend = async (req: Request, res: Response) => {
    const _id = getUserIdFromToken(req);
    const addFriendDTO: AddFriendDTO = req.body;

    const user = await this.friendRepository.isExists({
      userId: _id,
      friendId: addFriendDTO.friendId,
      status: FRIENDS_STATUS_ENUM.ACCEPTED,
      isBlocked: false,
    });

    if (user) {
      throw new ConflictException("User already a friend");
    }

    const reverseFriend = await this.friendRepository.findOneAndUpdate(
      {
        userId: _id,
        friendId: addFriendDTO.friendId,
        status: FRIENDS_STATUS_ENUM.ACCEPTED,
      },
      {
        userId: _id,
        friendId: addFriendDTO.friendId,
        status: FRIENDS_STATUS_ENUM.ACCEPTED,
      },
      { upsert: true }
    );

    res.status(201).json({
      success: true,
      message: "Friend added successfully",
      data: reverseFriend,
    });
  };

  removeFriend = async (req: Request, res: Response) => {
    const _id = getUserIdFromToken(req);
    const removeFriendDTO: AddFriendDTO = req.body;

    const user = await this.friendRepository.isExists({
      userId: _id,
      friendId: removeFriendDTO.friendId,
      status: FRIENDS_STATUS_ENUM.ACCEPTED,
      isBlocked: false,
    });

    if (!user) {
      throw new NotFoundException("User not a friend");
    }

    const blockedUser = await this.friendRepository.isExists({
      userId: _id,
      friendId: removeFriendDTO.friendId,
      status: FRIENDS_STATUS_ENUM.ACCEPTED,
      isBlocked: true,
    });

    if (blockedUser) {
      throw new ConflictException("User is blocked");
    }

    await this.friendRepository.deleteOne({
      userId: _id,
      friendId: removeFriendDTO.friendId,
    });

    res.status(200).json({
      success: true,
      message: "Friend removed successfully",
    });
  };

  cancelFriendRequest = async (req: Request, res: Response) => {
    const _id = getUserIdFromToken(req);
    const cancelFriendRequestDTO: AddFriendDTO = req.body;

    await this.friendRepository.updateOne(
      {
        userId: _id,
        friendId: cancelFriendRequestDTO.friendId,
        status: FRIENDS_STATUS_ENUM.PENDING,
      },
      { status: FRIENDS_STATUS_ENUM.REJECTED }
    );

    res.status(201).json({
      success: true,
      message: "Friend request cancelled successfully",
    });
  };

  sendFriendRequest = async (req: Request, res: Response) => {
    const _id = getUserIdFromToken(req);
    const addFriendDTO: AddFriendDTO = req.body;

    if (addFriendDTO.friendId.toString() === _id?.toString()) {
      throw new ConflictException("You can't send friend request to yourself");
    }

    const existingRelation = await this.friendRepository.isExists({
      $or: [
        { userId: _id, friendId: addFriendDTO.friendId },
        { userId: addFriendDTO.friendId, friendId: _id },
      ],
    });

    if (existingRelation) {
      throw new ConflictException(
        "Friend request already exists or users are already friends"
      );
    }

await this.friendRepository.create({
  

  status: FRIENDS_STATUS_ENUM.PENDING,
});


    res.status(201).json({
      success: true,
      message: "Friend request sent successfully",
    });
  };

  acceptFriendRequest = async (req: Request, res: Response) => {
    const _id = getUserIdFromToken(req);
    const acceptFriendDTO: AddFriendDTO = req.body;

    const friendRequest = await this.friendRepository.isExists({
      userId: acceptFriendDTO.friendId,
      friendId: _id,
      status: FRIENDS_STATUS_ENUM.PENDING,
    });

    if (!friendRequest) {
      throw new NotFoundException("Friend request not found");
    }

    await this.friendRepository.updateOne(
      { userId: acceptFriendDTO.friendId, friendId: _id },
      { status: FRIENDS_STATUS_ENUM.ACCEPTED }
    );

    await this.friendRepository.create({
     
    
      status: FRIENDS_STATUS_ENUM.ACCEPTED,
      
    });

    res.status(201).json({
      success: true,
      message: "Friend request accepted successfully",
    });
  };

  getFriends = async (req: Request, res: Response) => {
    const _id = getUserIdFromToken(req);

 
// const friends = await this.friendRepository.find(
//   {
//     userId: _id,
//     status: FRIENDS_STATUS_ENUM.ACCEPTED,
//     isBlocked: false,
//   },
//   {},
//   {
//     populate: [
//       {
//         path: "friendId",
//         select: "_id fullName avatar firstName lastName email",
//       },
//     ],
//     sort: { createdAt: -1 },
//   }
// );



    res.status(200).json({
      success: true,
      message: "Friends fetched successfully",
      
    });
  };
}
export default new FriendService();
