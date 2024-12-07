const Task = require("../models/createTaskModel");

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const taskExists = await Task.findById(taskId);
    if (!taskExists) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task Deleted Successfully", status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error deleting task",
      reason: err.message,
    });
  }
};

module.exports = deleteTask;
