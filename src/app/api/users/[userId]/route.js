//src/app/api/users/[userId]/route,js
import { User } from "@/models/user";
import { NextResponse } from "next/server";


// get user
export async function GET(request, { params }) {
  const { userId } = params;
  const user = await User.findById(userId).select("-password -confirm_Password");  //select("-password") means password not displayed in the output panel
  return NextResponse.json(user);
}

// delete user
export async function DELETE(request, { params }) {
  const { userId } = params;

  try {
    await User.deleteOne({
      _id: userId,  //key:value _id is key and userId is value
    });

    return NextResponse.json({
      message: "user deleted !!",
      success: true,
    });

  } catch (error) {
    return NextResponse.json({
      message: "Error in deleting user !!",
      success: false,
    });
  }
}


//update user:

export async function PUT(request, { params }) {
  const { userId } = params;

  const { name, password, confirm_Password, profileURL } = await request.json();

  try {
    const user = await User.findById(userId);

    user.name = name;
    user.confirm_Password = confirm_Password;
    user.password = password;
    user.profileURL = profileURL;
    // add more informationss

    const updatedUser = await user.save();
    return NextResponse.json(updatedUser);
    
  } catch (error) {
    return NextResponse.json({
      message: "failed to update user !!",
      success: false,
    });
  }
}