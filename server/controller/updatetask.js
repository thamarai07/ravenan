const Task = require("../models/createTaskModel");
const TaskStatus = require("../models/TaskModel");

const updateTask = async (req, res) => {
  try {
    const { taskId, description, due_date, status, title, UserId } = req.body;

    if (!taskId || !description || !due_date || !status || !title || !UserId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    const statusExists = await TaskStatus.findById(status);
    if (!statusExists) {
      return res.status(404).json({ error: "Invalid status ID" });
    }

    existingTask.description = description;
    existingTask.due_date = due_date;
    existingTask.status = status;
    existingTask.title = title;
    existingTask.UserId = UserId;

    const updatedTask = await existingTask.save();

    res.status(200).json({
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error updating task",
      reason: err.message,
    });
  }
};

module.exports = updateTask;
