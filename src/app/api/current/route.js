 //API for current user login data

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { connectDb } from "@/helper/db";

export async function GET(request) {
 // console.log("current api section started:");
  try {
  const authToken = request.cookies.get("authToken")?.value;

 console.log("AuthToken in current api section:",authToken);

  if(!authToken){
    return NextResponse.json({
      message:"user is not logged in !!"
    })
  }
  const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
  console.log("DecodedToken in current api section:",decodedToken);

  await connectDb();
  const user = await User.findById(decodedToken._id).select("-password -confirm_Password");

  if (!user) {
    return {
      status: 404,
      body: { message: "User not found." }
    };
  }
 
  return NextResponse.json(user);
} catch (error) {
  console.error("Error in GET /api/current:", error);
  return {
    status: 500,
    body: { message: "Internal server error." }
  };
}
}