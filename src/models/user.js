import mongoose,{Schema} from "mongoose";
import { Profiler } from "react";

const UserSchema=new Schema({
    name:String,
    email:{
      type:String,
      unique:true,
      require:[true,"Email Required !!"],
     
    },
    password:{
      type:String,
      require:[true,"Password Required !!"],
    },
    about:String,
    ProfilURL:String,
    // address:{
    //   street:string,
    //   city:string,
    //   country:string,
    //   pinCode:Number,
    // }
})

export const  User= mongoose.models.users || mongoose.model('users',UserSchema);  //'users' is a collection name in mongoDB