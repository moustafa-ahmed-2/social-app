import { GENDER } from "../../utils/common/enum";



export interface RegisterDTO{

    fullName ? :string ,
    email :string,
    password:string ,
    phoneNumber:string,
    Gender:GENDER


}


export interface VerifyAccountDTO{
    email:string,
    otp:string
}


export interface LoginDTO {
    email:string,
    password:string
}


export interface UpdatedUserDTO extends Partial <RegisterDTO>{}
