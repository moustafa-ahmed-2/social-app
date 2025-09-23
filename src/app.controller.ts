import { Request, Response, NextFunction, Express } from "express";

import authRouter from "./module/auth/auth.controller"
import { connectDB } from "./DB/connection";

import { AppError } from "./utils/error";
import userRouter from "./module/user/user.controller";

export function bootstrap(app:Express , express:any){

app.use(express.json())
connectDB()

app.use("/auth" , authRouter  )
app.use("/user" , userRouter)

app.use((error:AppError , req:Request , res:Response , next:NextFunction)=>{

return res.status(error.statuscode).json({message:error.message , success:false , errorDetails:error.errorDetails})

})


    app.all("/{*dummy}",(req,res,next)=>{
    return res.status(404).json({message:"Invalid router" , success:false})
    })

}


