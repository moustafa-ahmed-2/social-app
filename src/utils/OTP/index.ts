
export const  generateOTP = ():string =>  {

return Math.floor(Math.random() * 9999 + 10000) as unknown as string


}


export const generateExpireDate = (time:number)=>{

return Date.now() + time


}


