//src/app/forgot-password/page.js
"use client"

import React,{useState} from 'react'
import { useRouter } from "next/navigation";
import { forgotpassword } from "@/services/userService";
import { httpAxios } from "@/helper/httpHelper";


const ForgotPasswordPage = () => {

  const [email, setEmail] = useState('');
  const router = useRouter();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        console.log("Form submitted");
        console.log(email); // This should display the email in the console
        try {
           
          // Call the API to send the email for password reset

          const result = await httpAxios.post("/api/forgot-password", {email});
          console.log("Forgot password page result:",result);

          if (result.status === 200) {
            router.push("/login");    // Redirect the user to the login page upon successful email sending
          } else {
            console.error("Password reset request failed:", result);
          }
         
        } catch(err) {
         
        console.error('An error occurred while sending the password reset request:', err);
        }
    
    }

  return (
    <div className="py-44  px-24 items-center h-[92.2vh]  bg-center" style={{ backgroundImage: ` url('/forgot-password-.jpg')`,backgroundSize:"100%"}}>
        <div className=" mt-4 w-[30%]">
          <h4 className='text-5xl font-bold flex justify-center items-center pb-2'>Forgot your password?</h4>
          <h4  className='text-xl font-bold  items-center pb-2 mt-4'>Pelase enter your email address below</h4>
          <form onSubmit={handleSubmit}>
              <div className="my-3 py-4 ">
                <input
                  type="email"
                  placeholder="Enter email ID"
                  autoComplete="off"
                  name="email"
                  className="text-xl w-full border-b-2 px-4 py-2 border-gray-500 focus:outline-none focus:border-blue-500  bg-transparent placeholder:text-gray-600"
                  value={email} // Added value prop
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='flex items-center justify-center'>

                <button type="submit" className=" w-1/2 text-xl p-3 mt-4 rounded-full border-[#188fff] border-2 shadow-sm shadow-[#183bff]  bg-[#188fff] text-white hover:bg-[#188fffb7]  hover:border-[#188fffb7] hover:shadow-[#188fffb7]">
                  Continue
                </button>
              </div>
          </form>
        </div>
  </div>
  )
}
export default ForgotPasswordPage;

