import { Request, Response, NextFunction, Express } from "express";

import authRouter from "./module/auth/auth.controller"
import { connectDB } from "./DB/connection";

import { AppError } from "./utils/error";
import userRouter from "./module/user/user.controller";
import postRouter from "./module/Post/Post.controller";
import commentRouter from "./module/Comment/comment.controller";

export function bootstrap(app:Express , express:any){

app.use(express.json())
connectDB()

app.use("/auth" , authRouter  )
app.use("/user" , userRouter)
app.use("/post" , postRouter)
app.use("/comment" , commentRouter   )


app.use((error:AppError , req:Request , res:Response , next:NextFunction)=>{

// return res.status(error.statusCode).json({message:error.message , success:false ,
//      errorDetails:error.errorDetails})

const status = Number.isInteger(error?.statusCode) ? error.statusCode : 500;
return res.status(status).json({
    message: error.message || "Internal Server Error",
    success: false,
    errorDetails: error.errorDetails || null,
  });


})




    app.all("/{*dummy}",(req,res,next)=>{
    return res.status(404).json({message:"Invalid router" , success:false})
    })

}








