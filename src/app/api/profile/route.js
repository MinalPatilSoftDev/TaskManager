//src/api/profile/route.js

import multer from 'multer';
import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import fs from "node:fs/promises";
import path from 'path';


export async function PUT(req, res) {
  await connectDb();
  if (req.method === 'PUT') {
      const formData = await req.formData();
      const file = formData.get("file");
      const userId = formData.get('userId');

      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const targetPath = path.join('public', 'uploads', file.name);

      await fs.writeFile(targetPath, buffer);

       // Replace backslashes with forward slashes and remove initial "public" directory
       const transformedURL = targetPath.replace(/\\/g, '/').replace(/^public\//, '');
      

      try {
        if(file && transformedURL){
          const result = await User.updateOne(
            { _id: userId },
            { $set: { profileURL: transformedURL } }
          );
        if (result.modifiedCount === 1) {
          return Response.json({success:true,message:"uploaded successfully", profileURL: transformedURL},{status:201})
        } else {
          return Response.json({success:true,message:"Something went wrong"},{status:400})
        }
      }
      } catch (error) {
        return Response.json({success:true,message:"server error"},{status:500})
      } 
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
