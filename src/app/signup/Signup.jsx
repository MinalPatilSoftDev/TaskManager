//src/app/signup/signup.jsx

"use client";
import React, { useState } from "react";
import signUpBanner from "../../assets/singup.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { signUp } from "@/services/userService";
import Link from "next/link";


const Signup = () => {
  const [isDivided, setIsDivided] = useState(false);
  const [nameError, setNameError] = useState(""); // State to manage name error message
  const [emailError, setEmailError] = useState(""); // State to manage email error message
  const [passError, setPassError] = useState(""); // State to manage pass error message
  const [confpassError, setConfpassError] = useState(""); // State to manage confirm pass error message

  const handleInputClick = () => {
    setIsDivided(true);
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_Password: "",
    profileURL:"/profile-default-icon.png",
  });

  const doSignup = async (event) => {
    event.preventDefault();

    //console.log("Data",data);
   
    // if (data.name.trim() === "" || data.name == null) {
    //   toast.warning("Name is required !!", {
    //     position: "top-center",
    //   });
    //   return;
    // }

    let hasError = false; // Variable to track if any validation error occurs

    // Validation for name field
    if (data.name.trim() === "" || data.name == null) {
      setNameError("Name is required"); // Set error message
      return;
    } else {
      setNameError(""); // Clear error message if name is provided
    }

   // Validation for email field
    if (data.email.trim() === "" || data.email == null) {
      setEmailError("Email is required"); // Set error message
      return;
    } else {
      setEmailError(""); // Clear error message if name is provided
    }

     // Validation for pass field
     if (data.password.trim() === "" || data.password == null) {
      setPassError("Password is required"); // Set error message
      return;
    } else {
      setPassError(""); // Clear error message if name is provided
    }

     // Validation for confirm pass field
     if (data.confirm_Password.trim() === "" || data.confirm_Password == null) {
      setConfpassError("Password is required"); // Set error message
      return;
    } else {
      setConfpassError(""); // Clear error message if name is provided
    }

     // Check if password and confirm password match
        if (data.password !== data.confirm_Password) {
          toast.error("Password do not match. Please try again.", {
            position: "top-center",
          });
          // Clear the password fields
          setData({
            ...data,
            password: "",
            confirm_Password: "",
          });
          return;
        }
   
    // form submit
    try {
      const result = await signUp(data);

     // console.log("result",result);

      toast.success("User is registered !!", {
        position: "top-center",
      });

      setData({
        name: "",
        email: "",
        password: "",
        confirm_Password: "",
        profileURL:"/profile-default-icon.png",
      });
    } catch (error) {
      console.log(error);
   //   console.log(error.response.data.message);
      toast.error("Signup Error !! " + error.response.data.message, {
        position: "top-center",
      });
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirm_Password: "",
      profileURL:"/profile-default-icon.png",
    });
  };

  return (
    <div className="grid grid-cols-12 bg-center h-[92.2vh] bg-cover" style={{ backgroundImage: `url('/login.jpg')`,}}>
      
      <div className="flex justify-center m-5 col-span-4 col-start-2 ">
            <Image
              src={signUpBanner}
              alt="signup banner"
              style={{
                width: "100%",
              }}
            />
      </div>

      <div className="col-span-4 col-start-7 m-10">
        <div className="py-5">
         
          <h1 className="text-3xl text-center">Signup to create an account </h1>
          <form action="#!" className="mt-5 p-6 shadow-md shadow-gray-500 border-t-[1px] " onSubmit={doSignup} >
            {/* name */}
            <div className="mt-3">
              <label
                htmlFor="user_name"
                className="block text-md font-medium mb-2 ps-2 text-black "
              >
                Username
              </label>

              <input
                  type="text"
                  className="w-full p-3 border-b border-gray-500 focus:outline-none focus:border-sky-500 bg-transparent placeholder:text-gray-500"
                  placeholder="Full name"
                  name="user_name"
                  onChange={(event) => {
                      setData({
                     ...data,
                      name: event.target.value,
                    });
                    setNameError(""); // Clear error message when typing in the input
                  }}
                  onClick={handleInputClick}
                  value={data.name}
              />

                {/* Display error message if nameError is not empty */}
                {nameError && (
                      <p className=" text-red-500 text-sm mt-1 px-3">{nameError}</p>
                  )}


              {/* {isDivided ? (
                  <div>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                  </div>
                ) : (
                            <input
                            type="text"
                            className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-sky-500 "
                            placeholder="Full name"
                            name="user_name"
                            onChange={(event) => {
                              setData({
                                ...data,
                                name: event.target.value,
                              });
                            }}
                            onClick={handleInputClick}
                            value={data.name}
                            />
                    )} */}
                  
            </div>

            {/* email */}
            <div className="mt-3">
              <label
                htmlFor="user_email"
                className="block text-md font-medium mb-2 ps-2 text-black"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 bg-transparent border-b placeholder:text-gray-500 border-gray-500 focus:outline-none focus:border-sky-500 "
                placeholder="New email"
                id="user_email"
                name="user_email"
                onChange={(event) => {
                  setData({
                    ...data,
                    email: event.target.value,
                  });
                  setEmailError(""); // Clear error message when typing in the input
                }}
                value={data.email}
              />

               {/* Display error message if emailError is not empty */}
               {emailError && (
                      <p className=" text-red-500 text-sm mt-1 px-3">{emailError}</p>
                  )}

            </div>
            {/* password */}
            <div className="mt-3">
              <label
                htmlFor="user_password"
                className="block text-md font-medium mb-2 ps-2 text-black"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 border-b bg-transparent placeholder:text-gray-500 border-gray-500 focus:outline-none focus:border-sky-500 "
                placeholder="Password"
                id="user_password"
                onChange={(event) => {
                  setData({
                    ...data,
                    password: event.target.value,
                  });
                  setPassError(""); // Clear error message when typing in the input
                }}
                value={data.password}
              />
              {/* Display error message if emailError is not empty */}
              {passError && (
                      <p className=" text-red-500 text-sm mt-1 px-3">{passError}</p>
                  )}

            </div>


            {/* about section */}
            <div className="mt-3">
              <label
                htmlFor="user_confirmpassword"
                className="block text-md font-medium mb-2 ps-2 text-black"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-3 border-b bg-transparent placeholder:text-gray-500 border-gray-500  focus:outline-none focus:border-sky-500"
                placeholder="Confirm password"
                id="user_confirmpassword"
                onChange={(event) => {
                  setData({
                    ...data,
                    confirm_Password: event.target.value,
                  });
                  setConfpassError(""); // Clear error message when typing in the input
                }}
                value={data.confirm_Password}
              />
                {/* Display error message if emailError is not empty */}
                {confpassError && (
                        <p className=" text-red-500 text-sm mt-1 px-3">{confpassError}</p>
                    )}
            </div>
           
            <div className="mt-6 text-center font-semibold text-md">
              <button
                type="submit"
                className="py-3 px-[25%] ms-3 rounded-full border-[#188fff] border-2 shadow-sm shadow-[#183bff]  bg-[#188fff] text-white hover:bg-[#188fffb7]  hover:border-[#188fffb7] hover:shadow-[#188fffb7]"
              >
                Signup
              </button>
              <div className="pt-6"> Already have an account?   
                <span className=" text-[#188fff] font-semibold hover:text-[#183bff]"><Link href="/login" > Login</Link></span>
              </div>
              {/* <button
                onClick={resetForm}
                type="button"
                className="px-3 py-2 border-[#188fff] border-2  shadow-md shadow-[#183bff] text-[#188fff] ms-3 rounded-full hover:bg-[#188fff] hover:text-white "
              >
               Signin
              </button> */}
            </div>

             {/* {JSON.stringify(data)}  */}
          </form>
        </div>
      </div>
     
    </div>
  );
};

export default Signup;