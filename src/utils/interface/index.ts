import { GENDER, SYS_ROLE, USER_AGENT } from "../common/enum";


 
export  interface IUser{

firstName:string ; 
lastName:string ;
fullName ? : string ; //virtual
password?:string ;
email:string;
phoneNumber? :string ;
credentialUpdatedAt: Date;
role:  SYS_ROLE;
gender: GENDER ;
userAgent: USER_AGENT;
otp?:string,
otpExpiryAt?:string,
isVerified:boolean


}
