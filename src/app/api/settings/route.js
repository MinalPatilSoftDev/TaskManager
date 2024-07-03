// src/api/settings/route.js

import { User } from "@/models/user";
import { connectDb } from "@/helper/db";
import bcrypt from "bcryptjs";



export async function PUT(req, res) {
//  console.log("Settings API page started:");
  await connectDb();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const body = await req.json(); // Parse the request body as JSON

  console.log("HTTP method in profile settings is:", req.method);
  console.log("Type in profile settings is:", type);
  console.log("Request Body:", body);

  if (req.method === "PUT") {

    if (type === "username") {
      console.log("type is username:");
      return updateUsername(body, res);
    } else if (type === "password") {
      console.log("type is password:");
      return updatePassword(body, res);
    }
    else if (type === "profile") {
      console.log("type is profile:");
      return updateProfile(body, res);
    } else {
      return new Response(JSON.stringify({ Status: "Invalid request type" }), { status: 400 });
    }
  } else {
    return new Response(JSON.stringify({ Status: "Method not allowed" }), { status: 405 });
  }
}


async function updateUsername(body, res) {
 // console.log("Entring updateUsername function")
  const { userId, newUsername } = body;
  //console.log("userid and newusername",userId,newUsername)
  try {
    console.log("Updating username for userId:", userId);
    const user = await User.findById(userId);
    
    if (!user) {
      console.log("User not found");
      return new Response(JSON.stringify({ Status: "User not found" }), { status: 404 });
    }

    user.name = newUsername;
    await user.save();
    console.log("New user name:",user)
    console.log("Username updated successfully");
    
    return new Response(JSON.stringify({ Status: "Username updated successfully"  }), { status: 200 });
  } catch (error) {
    console.error("Error updating username:", error);
    return new Response(JSON.stringify({ Status: "Server error" }), { status: 500 });
  }
}

async function updatePassword(body, res) {
  console.log("Entring updateUsername function")
  const { userId, currentPassword, newPassword, confirmPassword } = body;

  console.log("Received body:", body);

  if (!userId || !currentPassword || !newPassword || !confirmPassword) {
    console.log("Missing required parameters");
    return new Response(JSON.stringify({ Status: "Missing required parameters"  }), { status: 400 }); 
  }

  if (newPassword !== confirmPassword) {
    console.log("New password and confirm password do not match");
    return new Response(JSON.stringify({ Status: "New password and confirm password do not match"  }), { status: 400 }); 
  }

  try {
    console.log("Searching for user with ID:", userId);
    const user = await User.findById(userId);
    console.log(userId)
    if (!user) {
      console.log("User not found");
      return new Response(JSON.stringify({ Status: "User not found"  }), { status: 404 }); 
    }
    console.log("User found, comparing passwords");
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      console.log("Incorrect current password");
     return new Response(JSON.stringify({ Status: "Incorrect current password"  }), { status: 400 }); 
    }
    console.log("Passwords match, updating password");
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    console.log("Password updated successfully");
    return new Response(JSON.stringify({ Status: "Password updated successfully" }), { status: 200 }); 
    
  } catch (error) {
    console.error("Error updating password:", error);
    return new Response(JSON.stringify({ Status: "Server error" }), { status: 500 }); 
  }
}





