import UserContext from "@/context/userContext";
import React, { useContext } from "react";
import { RxCross1 } from "react-icons/rx";
// Import SweetAlert
import Swal from 'sweetalert2';

const Task = ({ task, deleteTaskParent }) => {
  const { user } = useContext(UserContext);

  // Function to delete a task
  const deleteTask = async (taskId) => {
    
    try {
      // Show SweetAlert confirmation
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
      
      // If confirmed, call the deleteTaskParent function
      if (result.isConfirmed) {
        await deleteTaskParent(taskId);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in deleting task !!');
    }
  };

  return (
    <div
      className={` shadow-lg mt-2 rounded-md ${
        task.status === "In Progress" ? "bg-yellow-200" :
        task.status === "Completed" ? "bg-green-300" :
        task.status === "Not Started" ? "bg-blue-200" :
        task.status === "Deferred" ? "bg-red-200" :
        "bg-gray-300" // Default color if status is not recognized
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{task.title}</h1>
          <span
            onClick={() => {
              deleteTask(task._id);
            }}
            className="shadow-lg shadow-gray-400 hover:bg-gray-400 bg-gray-200 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer "
          >
            <RxCross1 />
          </span>
        </div>
        <p className="font-normal mr-14 text-justify pt-2 ">{task.content}</p>
        <div className="flex justify-between mt-3">
          <p className="text-left">
            Status: <span className="font-bold">{task.status}</span>
          </p>
          <p className="text-right">
            Author: <span className="font-bold">{user?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Task;