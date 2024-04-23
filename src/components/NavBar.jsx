"use client"
import UserContext from "@/context/userContext";
// import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const NavBar = () => {
  return (
    <nav className="bg-rose-800 h-16 py-2 px-36 flex justify-between items-center">
      <div className="">
        <h1 className="text-2xl font-semibold text-white">
          TaskToDo
        </h1>
      </div>
      <div>
        <ul className="flex space-x-3  text-white text-lg">
              <li>
                <Link href={"/"} className=" hover:text-yellow-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"/add-task"} className="hover:text-yellow-400 ">
                  Add Task
                </Link>
              </li>
              <li>
                <Link href={"/show-tasks"} className=" hover:text-yellow-400">
                  Show Tasks
                </Link>
              </li>
        </ul>
      </div>
      <div>
        <ul className="flex space-x-3 text-white text-lg">
              <li>
                <Link href="/login" className=" hover:text-yellow-400">Login</Link>
              </li>
              <li>
                <Link href="/signup" className=" hover:text-yellow-400">Signup</Link>
              </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
