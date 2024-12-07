const TaskList = require("../models/createTaskModel");

const getTaskList = async (req, res) => {
  const { userid } = req.body
  try {
    const tasklist = await TaskList.find({UserId:userid})
      .populate('status', 'label ')  
      .populate('UserId', 'name email'); 

    res.status(200).json({ message: "Task list", tasklist,id: userid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching task list", reason: err.message });
  }
};

module.exports = getTaskList;
