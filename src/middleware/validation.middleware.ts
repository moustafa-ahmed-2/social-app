// import { RegisterDTO } from './../module/auth/auth.dto';
import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { BadRequestException } from "../utils/error";
import * as authValidation from "../module/auth/auth.validation"; 


export const isValid = (schema:ZodType)=>{


    return (req:Request , res:Response , next:NextFunction)=>{
   
        let data = {...req.body , ...req.params ,...req.query}
     
     const result =   authValidation.registerSchema.safeParse(data)
     // console.log(result);
     
     if(result.success ==false){
     
     let errorMessages = result.error.issues.map(issue => {
       return {
         path: issue.path[0],
         message: issue.message
       };
       
     
     });
     
     
     console.log(errorMessages);
     
     let errormessageStrings = JSON.stringify(errorMessages)
      throw new BadRequestException(errormessageStrings)
     
     
     
     
     }    
     

  return next();

    }


    




}


























// import { NextFunction, Request, Response } from "express";
// import { ZodType } from "zod";
// import { BadRequestException } from "../utils/error";

// export const isValid = (schema: ZodType<any>) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const data = { ...req.body, ...req.params, ...req.query };

//     const result = schema.safeParse(data);

//     if (!result.success) {
//       const errorMessages = result.error.issues.map(issue => ({
//         path: issue.path[0],
//         message: issue.message
//       }));

//       console.log(errorMessages);

//       return res.status(400).json({
//         success: false,
//         message: errorMessages
//       });
//     }

//     return next();
//   };
// };



