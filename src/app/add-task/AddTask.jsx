"use client";
import React, { useState } from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
import { addTask } from "@/services/taskService";
import { toast } from "react-toastify";


const statusOptions=[
    { value: "none", label: "---Select Status---", disabled: true },
    { value: "Not Started", label: "Not Started" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
    { value: "Deferred", label: "Deferred" }
];

const AddTask = () => {
  // console.log("this is add task component");


  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    // temp solution
    userId: "6620c61d02c2ab986a6b70d3",
  });

  const handleAddTask = async (event) => {
    event.preventDefault();      //default behavior of the form submission, which typically involves reloading the page or navigating to a new URL.
    console.log(task);      //task is variable/object so access title,content,status,UserID
    // validate task data
    try {
      const result = await addTask(task);     //addTask is service
      console.log(result);
      toast.success("Your task is added !!", {
        position: "top-center",
      });

      setTask({
        title: "",
        content: "",
        status: "none",
      });

    } catch (error) {
      console.log(error);
      toast.error("Task not added !!", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="grid grid-cols-12  justify-center">
      <div className="col-span-4 col-start-5 p-5 shadow-sm">
        <div className="my-8 flex justify-center">
          <Image
            src={loginSvg}
            style={{
              width: "50%",
            }}
            alt="Login banner"
          />
        </div>
        <h1 className="text-3xl text-center">Add your task here </h1>

        <form action="#!" onSubmit={handleAddTask}>
          {/* task title  */}
          <div className="mt-4">
            <label
              htmlFor="task_title"
              className="block text-md font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-3xl text-black bg-gray-300 focus:outline-none  border border-gray-400 shadow-md shadow-gray-700"
              id="task_title"
              name="task_title"
              onChange={(event) => {
                setTask({
                  ...task,
                  title: event.target.value,
                });
              }}
              value={task.title}
            />
          </div>
          {/* task CONENT  */}
          <div className="mt-4">
            <label
              htmlFor="task_content"
              className="block text-md font-medium mb-2"
            >
              Content
            </label>
            <textarea
              className="w-full p-3 rounded-3xl text-black  bg-gray-300 focus:outline-none border border-gray-400 shadow-md shadow-gray-700"
              id="task_content"
              rows={5}
              name="task_content"
              onChange={(event) => {
                setTask({
                  ...task,
                  content: event.target.value,
                });
              }}
              value={task.content}
            />
          </div>

          {/* task status */}
          <div className="mt-4">
            <label
              htmlFor="task_status"
              className="block text-md font-medium mb-2"
            >
              Status
            </label>

            <select
              id="task_status"
              className="w-full p-3 px-4 custom-select rounded-3xl text-black   bg-gray-300  border border-gray-400 shadow-md shadow-gray-700"
              name="task_status"
              onChange={(event) => {
                setTask({
                  ...task,
                  status: event.target.value,
                });
              }}
              value={task.status}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value} disabled={option.disabled} 
                className={option.value === "none" ? "text-gray-600" : "text-black"}
                style={{ backgroundColor: option.value === "none" ? "white" : "white" }} // Set background color of options
    >
                  {option.label}
                </option>
              ))}
            </select>


          </div>

          {/* button  actions */}
          <div className="mt-4 flex justify-center">
            <button className="bg-gray-500  py-2 px-3 rounded-full shadow-lg  shadow-gray-700 hover:bg-gray-600 text-lg text-white">
              Add Task{" "}
            </button>
            <button className=" bg-gray-500 py-2 px-3 rounded-full shadow-lg shadow-gray-700 hover:bg-gray-600 text-lg text-white ms-3">
              Clear
            </button>
          </div>

          {/* Display logs */}
          {/* {JSON.stringify(task)}    */}
        </form>
      </div>
    </div>
  );
};

export default AddTask;