//src/app/api/forgot-pass/route.js
import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


 export async function POST(request) {
  try {
    
      //console.log("forgot-password api started");

      const { email} = await request.json();   //get email from request

      // Log the email ID to the console
      //console.log('Received email:', email);

      await connectDb();
      // const user = await User.findOne({email});
      const user = await User.findOne({
        email: email,
      });

      // Email found in the database
      //console.log('User found:', user); 

        if (!user) {
          return new Response(JSON.stringify({ Status: "User not found" }), { status: 404 });
        }

        const secretKey = process.env.JWT_KEY || 'default_secret_key';
        const resetToken = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1d" });

        //console.log("resetToken:",resetToken)

        // const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "1d" });

        const resetUrl=`http://localhost:3000/reset-password/${user._id}/${resetToken}`;
        const message =`<h1>You have requested a password reset</h1>
                        <p>Please follow the instructions below to reset your password: </p>
                        <ol>
                          <li>Click on the following link to reset your password: </li>
                          <a href="${resetUrl}"> Reset Password </a>
                          <li>If the link does not work, copy and paste the following URL into your browser:</li>
                          <code>${resetUrl}</code>
                        </ol>
                        <p>If you did not request this password reset, please ignore this email.</p>
                        <p>Thank you!</p>`

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.NEXT_PUBLIC_ADMIN_EMAIL_FULL,
          to: user.email,
          subject: "Reset Password Link",
          // text: message,
          html: message,
        };

        const response = await transporter.sendMail(mailOptions);
        console.log({response})
        return new Response(JSON.stringify({ Status: "Success" }), { status: 200 });

      } catch (error) {
        console.error("Error in forgot-pass route:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
      }
 }

