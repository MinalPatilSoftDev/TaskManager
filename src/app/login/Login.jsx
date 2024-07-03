//src/app/login/login.js
"use client";
import UserContext from "@/context/userContext";
import { login } from "@/services/userService";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext);
//  console.log("login page context data",context.user);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginFormSubmitted = async (event) => {
    event.preventDefault();
    console.log("Login Data",loginData);
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      toast.info("Invalid Data !!", {
        position: "top-center",
      });
      return;
    }

    //valid data
    //login

    try {
      const result = await login(loginData);
     // console.log(result);
      toast.success("Logged In");
      //redirect
      context.setUser(result.user);
      router.push("/user_profile");

      setLoginData({
        email: "",
        password: "",
      });

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
     
     <div className="grid grid-cols-12 bg-cover bg-center justify-center py-[10%]" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url('/login.jpg')`,}}>
      <div className=" col-start-3 col-span-4 bg-cover bg-center bg-no-repeat bg-[url('/1.png')] shadow-2xl shadow-rose-900 items-center justify-center flex flex-col">
          <h1 className="text-5xl text-center  text-white">Welcome To</h1>
          <h1 className="text-5xl text-center py-4 text-white ">User Login</h1>
      </div>

      <div className="col-span-4 col-start-7 bg-white bg-opacity-65 shadow-2xl shadow-rose-900 ">
        <form action="#!" className=" p-6  " onSubmit={loginFormSubmitted}>
          <div className="mt-3">
            <label
              htmlFor="user_email"
              className="block text-md font-medium mb-2 ps-2 text-black "
            >
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border-b-[1px] border-gray-300 focus:outline-none leading-tight focus:border-sky-500  bg-transparent  "
              placeholder="Enter email id"
              id="user_email"
              name="user_email"
              autoComplete="off"  // Add this line to disable browser suggestions
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  email: event.target.value,
                });
              }}
              value={loginData.email}
            />
          </div>
          {/* password */}
          <div className="mt-6">
            <label
              htmlFor="user_password"
              className="block text-md font-medium mb-2 ps-2 text-black "
            >
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-sky-500 bg-transparent"
              placeholder="Enter password"
              id="user_password"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                });
              }}
              value={loginData.password}
            />
          </div>

          <div className="py-6"><Link href="/forgot-password" className=" text-[#188fff] hover:text-[#183bff] font-semibold flex justify-end">Forget Password?</Link></div>
          
          <div className=" text-center">
            <button
              type="submit"
              className="px-[25%] py-2 font-semibold text-lg ms-3 rounded-full border-[#188fff] border-2 shadow-sm shadow-[#183bff]  bg-[#188fff] text-white hover:bg-[#188fffb7]  hover:border-[#188fffb7] hover:shadow-[#188fffb7]"
            >
              Continue
            </button>

            <div className="p-6"> Don't have an account? 
                <span className=" text-[#188fff] font-semibold hover:text-[#183bff]"><Link href="/signup" > Create Account</Link></span>
            </div>
           
          </div>
        </form>
      </div>
      {/* {JSON.stringify(loginData)} */}
    </div>
    </>
    
  );
};

export default Login;