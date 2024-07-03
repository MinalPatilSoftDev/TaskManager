// src/app/reset-password/[userid]/[token]/page.jsx

"use client"   // Ensure this runs on the client-side

import React,{useState,useEffect } from 'react'
import { useRouter } from "next/navigation";
import { resetpassword } from "@/services/userService";
import axios from 'axios'

 const ResetPasswordPage = ({ params }) => {
  const router = useRouter();
  const { userid, token } = params;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleResetPassword = async (e) => {
    e.preventDefault();
     setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/reset-password', { userid, token, password });

      const data = response.data; // Access response data directly with axios

      if (data.success) {
        setSuccess("Password has been reset successfully.");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };


  return (

      <div className="flex mx-auto justify-center h-[92.2vh] bg-cover bg-center " style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url('/Reset-pass.jpg')`,}} >
          <div className=" bg-opacity-55 px-10 py-6 mt-16 rounded w-[30%] h-[40%] shadow-md shadow-rose-400 ">
            <h4 className='text-3xl font-bold flex justify-center items-center pb-2 text-white '>Reset Password</h4>
            <form onSubmit={handleResetPassword}>
              <div className="my-3 pt-4">
                <input
                  type="password"
                  placeholder="Enter New Password"
                  autoComplete="off"
                  name="password"
                  value={password}
                  className="text-xl w-full border-b-2 bg-transparent px-4 py-2 border-black opacity-35 focus:outline-none focus:border-blue-500 placeholder:text-white"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3 py-2">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  autoComplete="off"
                  name="password"
                  value={confirmPassword}
                  className="text-xl w-full border-b-2 px-4 py-2 bg-transparent border-black opacity-35 focus:outline-none focus:border-blue-500 placeholder:text-white"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {success && <p style={{ color: "green" }}>{success}</p>}
                  <div className='flex items-center justify-center  '>
                      <button type="submit" className="bg-rose-700 w-1/2 text-xl p-3 rounded-full text-white hover:bg-rose-800">
                          Continue
                      </button>              
                  </div>
            </form>
          </div>
      </div>
  )
}


export default  ResetPasswordPage;