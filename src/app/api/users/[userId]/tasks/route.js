// localhost:3000/api/users/[userId]/tasks

import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";


export async function GET(request, { params }) {               //request is object of NextRequest and used to fetch information(data)
  const { userId } = params;

  try {
    // get user using id




    await connectDb();

    //Get all task using user id
    const tasks = await Task.find({
      userId: userId,  //userId: userId  =>  property of schema: const { userId }
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return getResponseMessage("Failed to get tasks", 404, false);
  }
}