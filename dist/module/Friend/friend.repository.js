"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRepository = void 0;
const friend_model_1 = require("./friend.model");
const abstract_repository_1 = require("../../DB/abstract.repository");
class FriendRepository extends abstract_repository_1.AbstractRepository {
    model;
    constructor() {
        super(friend_model_1.friend);
        this.model = friend_model_1.friend;
    }
    async isExists(query) {
        const result = await this.model.exists(query);
        return !!result;
    }
    async updateOne(filter, update) {
        return this.update(filter, update);
    }
    async findOneAndUpdate(filter, update, options = { new: true, upsert: true }) {
        return this.model.findOneAndUpdate(filter, update, options);
    }
    async deleteOne(filter) {
        return this.delete(filter);
    }
    async blockUser(userId, friendId) {
        await this.model.updateOne({ userId, friendId }, {
            $set: {
                isBlocked: true,
                blockedAt: new Date(),
                status: "accepted",
            },
        }, { upsert: true });
    }
    async unblockUser(userId, friendId) {
        await this.model.updateOne({ userId, friendId }, { $set: { isBlocked: false, blockedAt: null } });
    }
    async sendRequest(userId, friendId) {
        return await this.model.create({
            userId,
            friendId,
            status: "pending",
            isBlocked: false,
        });
    }
    async acceptRequest(userId, friendId) {
        await this.model.updateOne({ userId: friendId, friendId: userId, status: "pending" }, { status: "accepted" });
        await this.model.updateOne({ userId, friendId }, { status: "accepted", isBlocked: false }, { upsert: true });
    }
    async cancelRequest(userId, friendId) {
        await this.model.updateOne({ userId, friendId, status: "pending" }, { status: "rejected" });
    }
    async removeFriend(userId, friendId) {
        await this.model.deleteOne({ userId, friendId });
        await this.model.deleteOne({ userId: friendId, friendId: userId });
    }
    async getFriends(userId) {
        return this.model
            .find({
            userId,
            status: "accepted",
            isBlocked: false,
        })
            .populate({
            path: "friendId",
            select: "_id fullName firstName lastName avatar email",
        })
            .sort({ createdAt: -1 });
    }
    async getPendingRequests(userId) {
        return this.model
            .find({
            friendId: userId,
            status: "pending",
            isBlocked: false,
        })
            .populate({
            path: "userId",
            select: "_id fullName firstName lastName avatar email",
        })
            .sort({ createdAt: -1 });
    }
    async getSentRequests(userId) {
        return this.model
            .find({
            userId,
            status: "pending",
            isBlocked: false,
        })
            .populate({
            path: "friendId",
            select: "_id fullName firstName lastName avatar email",
        })
            .sort({ createdAt: -1 });
    }
}
exports.FriendRepository = FriendRepository;
