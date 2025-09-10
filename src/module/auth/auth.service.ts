import { UserRepository } from './../../DB/model/user/user.repository';
import type { NextFunction, Request, Response } from "express";
import { RegisterDTO } from "./auth.dto";
import { ConflictException } from '../../utils/error';
import { AuthFactorySercice } from './factory';



class AuthService{

constructor(){}

private UserRepository = new UserRepository();
private authFactoryService = new AuthFactorySercice()

 register  =  async  (req:Request , res:Response , next:NextFunction)=>{
   

    const registerDTO:RegisterDTO = req.body

const userExist = await this.UserRepository.exist({
    email:registerDTO.email
})


if(userExist){
    throw new ConflictException("user Already Exist");
}

const user = this.authFactoryService.register(registerDTO);




const createUser = await this.UserRepository.create(user);

return res.status(201).json({
    message:"user created successfully" 
    , success:true ,
     data:createUser})


     

}




}

export default new AuthService()

