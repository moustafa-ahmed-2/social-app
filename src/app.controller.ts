import { type Express } from "express";

import authRouter from "./module/auth/auth.controller"
import { connectDB } from "./DB/connection";


export function bootstrap(app:Express , express:any){

app.use(express.json())
connectDB()

app.use("/auth" , authRouter  )


    app.all("/{*dummy}",(req,res,next)=>{
    return res.status(404).json({message:"Invalid router" , success:false})
    })

}


