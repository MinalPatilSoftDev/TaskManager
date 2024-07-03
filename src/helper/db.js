//src/helper/db.js

import mongoose from "mongoose"
import { User } from "../models/user"

export const connectDb = async() => {

  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }
  try{
      const {connection}=await mongoose.connect(process.env.MONGO_DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName:'work_manager',
      })

      console.log("Database connected..")
      console.log("connected with host",connection.host)

      //testing and creating new user
      //  const uuser=new User({
      //     name:"test name",
      //     email:"test@gmail.com",
      //     password:"testpassword",
      //     about:"this is testing"
      //   })

      //  await uuser.save()
      //  console.log("user it created")

  }catch(error){
    console.log("Database connection failed:")
    console.log(error);
  }

  
}
