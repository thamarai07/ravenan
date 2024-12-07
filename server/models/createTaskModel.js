const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    due_date: { type: Date, required: true },
    status: { type: mongoose.Schema.Types.ObjectId, ref: "TaskStatus", required: true }, 
    title: { type: String, required: true },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } 
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
