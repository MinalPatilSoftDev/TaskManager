import mongoose from "mongoose"
import { User } from "../models/user"

export const connectDb = async() => {

  try{
      const {connection}=await mongoose.connect(process.env.MONGO_DB_URL,{
        dbName:'work_manager',
      })

      console.log("db connected..")
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
    console.log("failed to connect with data base")
    console.log(error);
  }

  
}
