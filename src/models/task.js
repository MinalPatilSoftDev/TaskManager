import mongoose from "mongoose";


// Define the enum separately
export const TaskStatusEnum = ["Not Started", "In Progress", "Completed", "Deferred"];


const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  addedDate: {
    type: Date,
    required: true,
    default: Date.now(), // Date.now():- add current date
  },

  dueDate: {
    type: Date,
    default:null,
  },

  status: {
    type: String,
    // enum: ["Not Started","In Progress", "completed","Deferred"],

    enum: TaskStatusEnum, // Use the exported enum here
    default: "Not Started",
  },


  //link user and their task
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
});

export const Task = mongoose.models.tasks || mongoose.model("tasks", TaskSchema);