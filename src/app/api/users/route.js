//src/app/api/users/route.js
import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
// connectDb();

// get request function - display all users
export async function GET(request) {
  let users = [];
  try {
     await connectDb();
    users = await User.find().select("-password -confirm_Password");  //select("-password") means password not displayed in the output panel
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({
      message: "failed to get users",
      success: false,
    });
  }
  return NextResponse.json(users);
}

// post request function
// data post


//create user
export async function POST(request) {

   // fetch user detail from  request

   const { name, email, password,confirm_Password, profileURL } = await request.json();

   //console.log("Profile URL:",{ name, email, password, confirm_Password, profileURL });
 
   // create user object with user model
 
   const user = new User({
     name,
     email,
     password,
     confirm_Password,
     profileURL,
   });
 

   try {
     // save the object to  database
     user.password = bcrypt.hashSync(
       user.password,
       parseInt(process.env.BCRYPT_SALT)
     );

     user.confirm_Password=bcrypt.hashSync(
      user.confirm_Password,
      parseInt(process.env.BCRYPT_SALT)
     )
 
    //  console.log(user);
     await connectDb();
     const createdUser = await user.save();

     // Return success response
     const response = NextResponse.json(user, {
       status: 201,
     });
     return response;
   } catch (error) {
      console.log(error);

     // Return custom error message with status false
     return NextResponse.json({message: "failed to create user !!",status: false,},{status: 500,});
   }
 
 // const body = request.body;
  // console.log(body);
  // console.log(request.method);
  // console.log(request.cookies);
  // console.log(request.headers);
  // console.log(request.nextUrl.pathname);
  // console.log(request.nextUrl.searchParams);

  // const jsonData = await request.json();

  // const textData = await request.text();

  // console.log(jsonData);

  // console.log(textData);

  // return NextResponse.json({
  //   message: "posting user data",
  // });
}

// delete request  function
// uri variable