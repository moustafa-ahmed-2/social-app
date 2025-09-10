import { FilterQuery } from "mongoose";
import { IUser } from "../../../utils/interface";
import { AbstractRepository } from "../../abstract.repository";
import { User } from "./user.model";

export class UserRepository extends AbstractRepository<IUser>{


constructor(){
    super(User)
}

async getAllusers(){
    return await this.model.find()
}
async getspecificuser(filter:FilterQuery<IUser>){
    return await this.getOne(filter)
}






}


