const mongoose = require("mongoose");
const Task = require("../models/createTaskModel");

const createTask = async (req, res) => {
  try {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const details = await Task.findOne({ _id: new mongoose.Types.ObjectId(id) }).populate('UserId', 'name email'); ;
    if (!details) {
      return res.status(404).json({ error: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task Details", task: details });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating task", reason: err.message });
  }
};

module.exports = createTask;
