


import bcrypt from "bcryptjs";



export const generateHash = (plantext:string) =>{

return bcrypt.hashSync(plantext , 10)

}

export const compareHash = (password:string , hashpassword:string )=>{

    return bcrypt.compareSync(password , hashpassword)


}