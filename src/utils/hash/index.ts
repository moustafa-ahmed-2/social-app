


import bcrypt from "bcryptjs";



export const generateHash =async (plantext:string) =>{

return bcrypt.hash(plantext , 10)

}

export const compareHash =async (password:string , hashpassword:string )=>{

    return bcrypt.compare(password , hashpassword)


}



export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};
