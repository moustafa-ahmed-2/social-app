



import { Model, FilterQuery, UpdateQuery } from "mongoose";
import { friend } from "./friend.model";
import { IFriend } from "../../utils/interface";
import { AbstractRepository } from "../../DB/abstract.repository";

export class FriendRepository extends AbstractRepository<IFriend> {
  protected override model: Model<IFriend>;

  constructor() {
    super(friend);
    this.model = friend;
  }

  async isExists(query: FilterQuery<IFriend>): Promise<boolean> {
    const result = await this.model.exists(query);
    return !!result;
  }

  async updateOne(filter: FilterQuery<IFriend>, update: UpdateQuery<IFriend>) {
  
    return this.update(filter, update);
  }

  async findOneAndUpdate(
    filter: FilterQuery<IFriend>,
    update: UpdateQuery<IFriend>,
    options: Record<string, any> = { new: true, upsert: true }
  ) {
    return this.model.findOneAndUpdate(filter, update, options);

  }

  async deleteOne(filter: FilterQuery<IFriend>) {
   
    return this.delete(filter);
  }


  async blockUser(userId: string, friendId: string): Promise<void> {
    await this.model.updateOne(
      { userId, friendId },
      {
        $set: {
          isBlocked: true,
          blockedAt: new Date(),
          status: "accepted",
        },
      },
      { upsert: true }
    );
  }

  async unblockUser(userId: string, friendId: string): Promise<void> {
    await this.model.updateOne(
      { userId, friendId },
      { $set: { isBlocked: false, blockedAt: null } }
    );
  }

  async sendRequest(userId: string, friendId: string): Promise<IFriend> {
    return await this.model.create({
      userId,
      friendId,
      status: "pending",
      isBlocked: false,
    });
  }

  async acceptRequest(userId: string, friendId: string): Promise<void> {
    await this.model.updateOne(
      { userId: friendId, friendId: userId, status: "pending" },
      { status: "accepted" }
    );

    await this.model.updateOne(
      { userId, friendId },
      { status: "accepted", isBlocked: false },
      { upsert: true }
    );
  }

  async cancelRequest(userId: string, friendId: string): Promise<void> {
    await this.model.updateOne(
      { userId, friendId, status: "pending" },
      { status: "rejected" }
    );
  }

  async removeFriend(userId: string, friendId: string): Promise<void> {
    await this.model.deleteOne({ userId, friendId });
    await this.model.deleteOne({ userId: friendId, friendId: userId });
  }

  async getFriends(userId: string) {
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

  async getPendingRequests(userId: string) {
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

  async getSentRequests(userId: string) {
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
