const Task = require("../models/createTaskModel");
const TaskStatus = require("../models/TaskModel"); 

const createTask = async (req, res) => {
  try {
    const { description, due_date, status, title, UserId } = req.body;

    if (!description || !due_date || !status || !title || !UserId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const statusExists = await TaskStatus.findById(status);
    if (!statusExists) {
      return res.status(404).json({ error: "Invalid status ID" });
    }

    const taskCreated = new Task({
      description,
      due_date,
      status,
      title,
      UserId,
    });

    await taskCreated.save();

    res.status(200).json({ message: "Task Created Successfully", task: taskCreated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating task", reason: err.message });
  }
};

module.exports = createTask;
