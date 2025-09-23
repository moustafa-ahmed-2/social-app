import { FilterQuery } from 'mongoose';
import { UserRepository } from './../../../DB/model/user/user.repository';

import { BadRequestException, NotFoundException } from "../../../utils/error";
import { VerifyAccountDTO } from "../auth.dto";
import { IUser } from '../../../utils/interface';




export const authProvider = {


 async checkOTP(verifyAccountDTO:VerifyAccountDTO){

 const userRepository = new UserRepository();

 
const userExist = await userRepository.exist({
    email:verifyAccountDTO.email
})



if (!userExist ) {
  throw new NotFoundException("Not found");
}

if (!userExist?.otp || userExist.otp !== verifyAccountDTO.otp) {
  throw new BadRequestException("invalid otp");
}

if (!userExist.otpExpiryAt || new Date(userExist.otpExpiryAt) <= new Date()) {
  throw new BadRequestException("expired otp");
}


 }
,

 async updateUser(filter: FilterQuery<IUser>, update:any) {
    const userRepository = new UserRepository();
   await  userRepository.update(filter, update);
  }





}


