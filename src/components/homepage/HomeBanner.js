"use client";
import React from "react";
import bannerImage from "../../assets/Homer.png";
import Image from "next/image";
const BannerSection = () => {
  return (
    <div className=" text-black h-[92.2vh]" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) ,url('/HomeM.jpg')`,}}>
      <div className="container mx-auto  flex items-center justify-around ">
        <div className="w-[50%]">
          <Image
            src={bannerImage} // Replace with the actual path to your image
            alt="Banner"
            className=" w-full  rounded-full "
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4 text-rose-700">
            Welcome to Task Manager
          </h1>
          <p className="text-xl mb-8">
            Organize your tasks efficiently with our task manager app.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
