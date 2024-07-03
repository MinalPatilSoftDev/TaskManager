// src/app/api/reset-password/route.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDb } from '@/helper/db';
import {User} from '@/models/user';
import { MongoClient,ObjectId } from 'mongodb';

export async function POST(req) {
  const uri = process.env.MONGO_DB_URL;
  const client = new MongoClient(uri);

  //console.error("reset password api started:");
  try {
    await client.connect();

    const { userid,token, password} = await req.json();
   // console.log("user id:", userid,"token:",token,"password:",password)

    if (!token) {
     // console.error('Token not provided');
      return new Response(JSON.stringify({ success: false, error: 'Token not provided' }), { status: 400 });
    }

    // Verify JWT token
    let decoded;
    try {
       decoded = jwt.verify(token, process.env.JWT_KEY);
       console.error('decoded token:', decoded);
    } catch (error) {
      console.error('Invalid token', error);
      return new Response(JSON.stringify({ success: false, error: 'Invalid token' }), { status: 400 });
    }

    if (decoded.id !== userid) {
      //console.error('Token ID does not match user ID');
      return new Response(JSON.stringify({ success: false, error: 'Invalid token' }), { status: 400 });
    }

    // Connect to the database
    await connectDb();

    // Find user by ID
    const user = await User.findOne({
      _id: userid,
    });

   // console.log('User found:', user); 

    if (!user) {
     // console.error('User not found');
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and confirm_password
    user.password = hashedPassword;
    await user.save();


    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Password reset error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Invalid or expired token' }), { status: 400 });
  }
}
