// import { registerSchema } from './auth.validation';
import { UserRepository } from './../../DB/model/user/user.repository';
import type { NextFunction, Request, Response } from "express";
import { RegisterDTO, VerifyAccountDTO } from "./auth.dto";
import { BadRequestException, ConflictException, NotFoundException } from '../../utils/error';
import { AuthFactorySercice } from './factory';
import { authProvider } from './provider/auth.provider';

// import { sendEmail } from '../../utils/email';


class AuthService{

constructor(){}

private userRepository = new UserRepository();
private authFactoryService = new AuthFactorySercice()

 register  =  async  (req:Request , res:Response , next:NextFunction)=>{
   

    const registerDTO:RegisterDTO = req.body






const userExist = await this.userRepository.exist({
    email:registerDTO.email
})



if(userExist){
    throw new ConflictException("user Already Exist");
}


const user = await this.authFactoryService.createUser(registerDTO);




const createUser = await this.userRepository.create(user);

delete user.password;
delete user.otp;
delete user.otpExpiryAt;



return res.status(201).json({
    message:"user created successfully" 
    , success:true ,
     data:createUser})


     

}







verifyAccount =async (req:Request , res:Response )=>{

const verifyAccountDTO:VerifyAccountDTO  =req.body;


 await  authProvider.checkOTP(verifyAccountDTO) 
await this.userRepository.update(
    {email:verifyAccountDTO.email},
    {isVerified:true ,
        $unset:{otp:"" , otpExpiryAt:" "}
    } ,
    


)

return res.status(204).json({message:"done" , success:true  })


}


}

export default new AuthService()


