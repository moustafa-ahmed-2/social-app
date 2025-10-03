// import { registerSchema } from './auth.validation';
import { UserRepository } from './../../DB/model/user/user.repository';
import type { NextFunction, Request, Response } from "express";
import { LoginDTO, RegisterDTO, VerifyAccountDTO } from "./auth.dto";
import { BadRequestException, ConflictException, ForBiddenException, NotFoundException } from '../../utils/error';
import { AuthFactorySercice } from './factory';
import { authProvider } from './provider/auth.provider';
import { compareHash } from '../../utils/hash';
import { generateToken } from '../../utils/token';

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


login = async (req:Request , res:Response)=>{

    const loginDTO:LoginDTO = req.body;
 
    const userExist = await this.userRepository.exist(
        {email:loginDTO.email})

        if(!userExist){
            throw new ForBiddenException("invalid credential")
        }

if (!loginDTO.password || !userExist.password) {
  throw new ForBiddenException("invalid credential");
}


  const isMatch = await compareHash(loginDTO.password, userExist.password);
  if (!isMatch) {
    throw new ForBiddenException("invalid credential");
  }


const accessToken = generateToken({
  payload: { _id: userExist._id.toString(), role: userExist.role },
  options: { expiresIn: "1d" },
});





return res.status(200).json({message:"login successfully" ,  success:true , data:accessToken })


}







}

export default new AuthService()


