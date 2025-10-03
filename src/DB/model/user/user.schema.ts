
// import { Schema } from "mongoose";
// import { IUser } from "../../../utils/interface";
// import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
// import { sendEmail } from "../../../utils/email";




// export const userSchema = new Schema<IUser>({

// firstName:{type:String , minLength:2  , maxLength:20 , required:true,  trim:true },
// lastName:{type:String , minLength:2  , maxLength:20 , required:true,  trim:true },
// email:{type:String , required:true , lowercase:true , trim:true} , 
// password:{type:String , required:function(){
//     if(this.userAgent == USER_AGENT.google) return false;
//     return true
// }   } ,

// credentialUpdatedAt:Date ,
// phoneNumber:String,
// // role:{
// //     type:String,
// //     enum:SYS_ROLE,
// //     default:SYS_ROLE.user
// // } ,
// // gender:{
// //     type:String,
// //     enum:GENDER,
// //     default:GENDER.male
// // },

// // userAgent:{
// //     type:String,
// //     enum:USER_AGENT,
// //     default:USER_AGENT.local
// // }

// role: { type: String, enum: Object.values(SYS_ROLE), default: SYS_ROLE.user },
// gender: { type: String, enum: Object.values(GENDER), default: GENDER.male },
// userAgent: { type: String, enum: Object.values(USER_AGENT), default: USER_AGENT.local },

// otp:{type:String} ,
// otpExpiryAt:{type:String} ,
// isVerified:{type:Boolean , default:false}

// }  ,  




// {
//     timestamps:true,
//     toJSON:{virtuals:true},
//     toObject:{virtuals:true}



// } )




// userSchema.virtual("fullName").get(function(){
//     return this.firstName + " " + this.lastName
// }).set(function(value:string){
//     const [fName  ,lName] = value.split(" ");
//     this.firstName = fName  as string;
//     this.lastName = lName as string ;
// })



// userSchema.pre("save" ,  function(next){

//     console.log({this:this});
//     console.log("pre-middleware")
//    next()


// }  )




// userSchema.pre("save" ,  function(next){

//   if(  this.userAgent !=  USER_AGENT.google    &&   this["isNew"] ==true )

//  sendEmail({
//     to:this.email , 
//     subject:"confirm account " ,
//     html:`<h1>  Your otp is ${this.otp}  </h1>  `
//  })
//  next()

// }  )




import { Schema, Document } from "mongoose";
import { IUser } from "../../../utils/interface";
import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { sendEmail } from "../../../utils/email";

// نوع المستند الذي يجمع بين IUser و mongoose Document
type IUserDocument = IUser & Document;

export const userSchema = new Schema<IUserDocument>(
  {
    firstName: { type: String, minlength: 2, maxlength: 20, required: true, trim: true },
    lastName: { type: String, minlength: 2, maxlength: 20, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: {
      type: String,
      required: function (this: IUserDocument) {
        // هذا الكود يعمل وقت التحقق قبل الحفظ — هنا نتحقق من userAgent
        return this.userAgent !== USER_AGENT.google;
      },
    },
    credentialUpdatedAt: { type: Date },
    phoneNumber: { type: String },

  role: { type: String, enum: Object.values(SYS_ROLE), default: SYS_ROLE.user },
gender: { type: String, enum: Object.values(GENDER), default: GENDER.male },
userAgent: { type: String, enum: Object.values(USER_AGENT), default: USER_AGENT.local },

    otp: { type: String },
    otpExpiryAt: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual fullName مع تعريف صحيح للـ this
userSchema
  .virtual("fullName")
  .get(function (this: IUserDocument) {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (this: IUserDocument, value: string) {
    const [fName = "", lName = ""] = value.split(" ");
    this.firstName = fName;
    this.lastName = lName;
  });

// pre save hooks — مع typing صحيح للـ this
userSchema.pre<IUserDocument>("save", function (next) {
  console.log("pre-middleware");
  next();
});

userSchema.pre<IUserDocument>("save", function (next) {
  // استخدم this.isNew بدل this["isNew"]
  if (this.isNew && this.userAgent !== USER_AGENT.google) {
    sendEmail({
      to: this.email,
      subject: "confirm account",
      html: `<h1>Your otp is ${this.otp}</h1>`,
    }).catch((err) => console.error("sendEmail error:", err));
  }
  next();
});
