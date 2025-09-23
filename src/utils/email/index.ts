
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { devConfig } from './../../config/env/dev.config.';



import nodemailer from "nodemailer" 



export const sendEmail = async (mailoption:MailOptions)=> {


const transporter =   nodemailer.createTransport({

service:"gmail" , 
auth:{

   user: devConfig.EMAIL , 
   pass: devConfig.PASSWORD

} ,
 tls: {
      rejectUnauthorized: false 
    }

})


mailoption.from = `social-app  <${devConfig.EMAIL} `
await transporter.sendMail(mailoption)



}





