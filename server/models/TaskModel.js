const mongoose = require("mongoose");

const taskStatusSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String, required: true }
  },
  { timestamps: true }
);

const TaskStatus = mongoose.model("TaskStatus", taskStatusSchema);

module.exports = TaskStatus;
