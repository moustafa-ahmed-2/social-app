import { User } from "../../../DB/model/user/user.model";
import { SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { generateHash } from "../../../utils/hash";
import { generateExpireDate, generateOTP } from "../../../utils/OTP";
import { RegisterDTO } from "../auth.dto";



export class AuthFactorySercice{

register(registerDTO:RegisterDTO)


{

    const user = new User();
    user.fullName = registerDTO.fullName as string ;
    user.email = registerDTO.email;
    user.password = generateHash(registerDTO.password);
    user.phoneNumber = registerDTO.phoneNumber as string ;
    user.otp = generateOTP();
    user.otpExpiryAt = generateExpireDate(5 * 60 *60 * 1000) as unknown as string  ;
   user.credentialUpdatedAt = Date.now() as unknown as Date;

    user.gender = registerDTO.Gender ;
    user.role = SYS_ROLE.user;
    user.userAgent = USER_AGENT.local
  return user;   



}










}
