import { ZodType } from "zod";
import { BadRequestException } from "../../utils/error";


export const isValidGraphql = (schema:ZodType , args:any)=>{


        let data = args
    const result = schema.safeParse(args)


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
     

    }

