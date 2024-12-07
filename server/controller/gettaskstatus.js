const Task = require("../models/TaskModel");

const getStatusdata = async (req, res) => {
  try {
    const tasklist = await Task.find();

    res.status(200).json({ message: "Task list", tasklist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user", reason: err.message });
  }
};

module.exports = getStatusdata;
