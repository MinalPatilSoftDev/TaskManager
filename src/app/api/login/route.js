//src/app/api/login/route.js
import { NextResponse } from "next/server";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";

export async function POST(request) {
  //console.log("login api");
  const { email, password } = await request.json();   //feach email and password from request

  try {
    // 1.get user
    await connectDb();
    const user = await User.findOne({
      email: email,
    });

    if (user == null) {
      throw new Error("user not found !!");
    }

    // 2.password check
     // Check if the provided password matches the hashed password in the database
    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      throw new Error("Password not matched !!");
    }

    // 3. generate token

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.JWT_KEY
    );

    // 4.create nextresponse-- cookie

    const response = NextResponse.json({
      message: "Login success !!",
      success: true,
      user: user,
    });

    response.cookies.set("authToken", token, {
      expiresIn: "1d",
      httpOnly: true,
    });

    console.log("Login User: ",user);
    console.log("Login AuthToken:-",token);

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

