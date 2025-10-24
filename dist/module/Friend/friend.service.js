"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const enum_1 = require("../../utils/common/enum");
const get_user_from_token_1 = require("../../utils/get-user-from-token");
const Friend_repository_1 = require("./Friend.repository");
class FriendService {
    friendRepository = new Friend_repository_1.FriendRepository();
    blockUser = async (req, res) => {
        const _id = (0, get_user_from_token_1.getUserIdFromToken)(req);
        const blockUserDTO = req.body;
        if (blockUserDTO.userId.toString() === _id?.toString()) {
            throw new error_1.ConflictException("You can't block yourself");
        }
        const alreadyBlocked = await this.friendRepository.isExists({
            userId: _id,
            friendId: blockUserDTO.userId,
            isBlocked: true,
        });
        if (alreadyBlocked) {
            throw new error_1.ConflictException("User already blocked");
        }
        await this.friendRepository.updateOne({ userId: _id, friendId: blockUserDTO.userId }, {
            status: enum_1.FRIENDS_STATUS_ENUM.ACCEPTED,
            isBlocked: true,
            blockedAt: new Date(),
        });
        res.status(201).json({
            success: true,
            message: "User blocked successfully",
        });
    };
    addFriend = async (req, res) => {
        const _id = (0, get_user_from_token_1.getUserIdFromToken)(req);
        const addFriendDTO = req.body;
        const user = await this.friendRepository.isExists({
            userId: _id,
            friendId: addFriendDTO.friendId,
            status: enum_1.FRIENDS_STATUS_ENUM.ACCEPTED,
            isBlocked: false,
        });
        if (user) {
            throw new error_1.ConflictException("User already a friend");
        }
        const reverseFriend = await this.friendRepository.findOneAndUpdate({
            userId: _id,
            friendId: addFriendDTO.friendId,
            status: enum_1.FRIENDS_STATUS_ENUM.ACCEPTED,
        }, {
            userId: _id,
            friendId: addFriendDTO.friendId,
            status: enum_1.FRIENDS_STATUS_ENUM.ACCEPTED,
        }, { upsert: true });
        res.status(201).json({
            success: true,
            message: "Friend added successfully",
            data: reverseFriend,
        });
    };
    removeFriend = async (req, res) => {
        const _id = (0, get_user_from_token_1.getUserIdFromToken)(req);
        const removeFriendDTO = req.body;
        const user = await this.friendRepository.isExists({
            userId: _id,
            friendId: removeFriendDTO.friendId,
            status: enum_1.FRIENDS_STATUS_ENUM.ACCEPTED,
            isBlocked: false,
        });
        if (!user) {
            throw new error_1.NotFoundException("User not a friend");
        }
        const blockedUser = await this.friendRepository.isExists({
            userId: _id,
            friendId: removeFriendDTO.friendId,
            status: enum_1.FRIENDS_STATUS_ENUM.ACCEPTED,
            isBlocked: true,
        });
        if (blockedUser) {
            throw new error_1.ConflictException("User is blocked");
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
    cancelFriendRequest = async (req, res) => {
        const _id = (0, get_user_from_token_1.getUserIdFromToken)(req);
        const cancelFriendRequestDTO = req.body;
        await this.friendRepository.updateOne({
            userId: _id,
            friendId: cancelFriendRequestDTO.friendId,
            status: enum_1.FRIENDS_STATUS_ENUM.PENDING,
        }, { status: enum_1.FRIENDS_STATUS_ENUM.REJECTED });
        res.status(201).json({
            success: true,
            message: "Friend request cancelled successfully",
        });
    };
    sendFriendRequest = async (req, res) => {
        const _id = (0, get_user_from_token_1.getUserIdFromToken)(req);
        const addFriendDTO = req.body;
        if (addFriendDTO.friendId.toString() === _id?.toString()) {
            throw new error_1.ConflictException("You can't send friend request to yourself");
        }
        const existingRelation = await this.friendRepository.isExists({
            $or: [
                { userId: _id, friendId: addFriendDTO.friendId },
                { userId: addFriendDTO.friendId, friendId: _id },
            ],
        });
        if (existingRelation) {
            throw new error_1.ConflictException("Friend request already exists or users are already friends");
        }
        await this.friendRepository.create({
            status: enum_1.FRIENDS_STATUS_ENUM.PENDING,
        });
        res.status(201).json({
            success: true,
            message: "Friend request sent successfully",
        });
    };
    acceptFriendRequest = async (req, res) => {
        const _id = (0, get_user_from_token_1.getUserIdFromToken)(req);
        const acceptFriendDTO = req.body;
        const friendRequest = await this.friendRepository.isExists({
            userId: acceptFriendDTO.friendId,
            friendId: _id,
            status: enum_1.FRIENDS_STATUS_ENUM.PENDING,
        });
        if (!friendRequest) {
            throw new error_1.NotFoundException("Friend request not found");
        }
        await this.friendRepository.updateOne({ userId: acceptFriendDTO.friendId, friendId: _id }, { status: enum_1.FRIENDS_STATUS_ENUM.ACCEPTED });
        await this.friendRepository.create({
            status: enum_1.FRIENDS_STATUS_ENUM.ACCEPTED,
        });
        res.status(201).json({
            success: true,
            message: "Friend request accepted successfully",
        });
    };
    getFriends = async (req, res) => {
        const _id = (0, get_user_from_token_1.getUserIdFromToken)(req);
        res.status(200).json({
            success: true,
            message: "Friends fetched successfully",
        });
    };
}
exports.default = new FriendService();
