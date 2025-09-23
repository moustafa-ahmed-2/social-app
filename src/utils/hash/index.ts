


import bcrypt from "bcryptjs";



export const generateHash =async (plantext:string) =>{

return bcrypt.hash(plantext , 10)

}

export const compareHash =async (password:string , hashpassword:string )=>{

    return bcrypt.compare(password , hashpassword)


}