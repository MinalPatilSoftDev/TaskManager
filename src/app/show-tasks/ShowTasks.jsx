"use client";
import UserContext from "@/context/userContext";
import { deleteTask, getTasksOfUser } from "@/services/taskService";
import React, { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const context = useContext(UserContext);

  async function loadTasks(userId) {
    try {
      const tasks = await getTasksOfUser(userId);    // return or display all tasks
      setTasks([...tasks].reverse());           //Display all data in array
      //console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (context.user) {
      loadTasks(context.user._id);
    }
  }, [context.user]);

  async function deleteTaskParent(tasksId) {
    try {
      const result = await deleteTask(tasksId);  // Call deleteTask API function
      //console.log(result);
      
      // Display success message with SweetAlert
      // Swal.fire({
      //   title: 'Deleted!',
      //   text: 'Your file has been deleted.',
      //   icon: 'success'
      // });

      // Filter out the deleted task
      const newTasks = tasks.filter((item) => item._id != tasksId);  //filter all task after deleted perticuler task
      setTasks(newTasks);
      toast.success("Your task is deleted ");
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting task !!");
    }
  }


  return (
    <div className="grid grid-cols-12 mt-4 ">
      <div className="col-span-6 col-start-4">
        <h1 className="text-3xl mb-3 ">Your tasks ( {tasks.length} )</h1>

        {tasks.map((task) => (
          <Task
            task={task}
            key={task._id}
            deleteTaskParent={deleteTaskParent}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowTasks;


