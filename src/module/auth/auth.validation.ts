

import { GENDER } from '../../utils/common/enum';
import { RegisterDTO } from './../../../src/module/auth/auth.dto';
import z from "zod";


export const registerSchema =  z.object<RegisterDTO>(

{

fullName:z.string().min(2).max(20) as unknown as string ,
email: z.string().email() as unknown as string ,
password:z.string()as unknown as string ,
phoneNumber:z.string() as unknown as string ,
Gender:z.enum(GENDER) as unknown as GENDER



}





)



