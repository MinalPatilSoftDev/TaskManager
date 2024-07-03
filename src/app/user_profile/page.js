"use client"

import React, { useContext } from "react";
import  UserContext  from "@/context/userContext"; // Assuming UserContext is exported as named export
import bannerImage from "../../assets/task-management.png";
import Image from "next/image";


const UserProfile = () => {
  const { user } = useContext(UserContext);
  return (
    <>
     <div className="relative  bg-cover bg-center h-[92.2vh] p-10" 
     style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('/HomeC.jpg')`,}}>
       
        {user ? (
          <>
            {/* <div className=" mx-auto  text-white p-10 items-center justify-around ">
                <div className="text-3xl  font-bold">
                    <h1 className="text-5xl font-bold pb-6">Hello,</h1>
                        <p className="">{user.name}</p>
                        <p className="text-lg pt-12 w-4/5">Welcome to your Task Management Dashboard.</p>
                        <p className="text-lg  w-4/5">Here, you can efficiently organize, track, and complete your tasks with ease. Let's get productive!</p>
                    </div>
                {/* <div className="mr-2">
                    <Image
                      src={bannerImage} // Replace with the actual path to your image
                      alt="Banner"
                      className="w-full animate-pulse-twice  "
                    />
                    </div> */}
            {/* </div> */} 
            <div className="pt-40">
              <h1 className="text-5xl text-white opacity-75 font-bold px-24 pt-16">Hello,</h1>
              <p className="px-24 pt-6 pb-16 text-3xl text-white opacity-75">{user.name}</p>
              
                <div className="w-[30%] bottom-0 rounded-3xl bg-cover bg-center text-white text-opacity-75 px-6 ml-40 py-10" style={{ backgroundImage:`linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)) ,url('/Bar.jpg')`,}}>
                  <div className="text-3xl font-bold">
                    <p className="text-xl w-[80%]">Welcome to your Task Management Dashboard.</p>
                    <p className="text-xl w-[80%]">Here, you can efficiently organize, track, and complete your tasks with ease. Let's get productive!</p>
                  </div>
                </div>
            </div>
          </>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </>
  );
};

export default UserProfile;
