const express = require("express");
const TaskStatus = require("../models/TaskModel");


const taskstatus = async (req, res) => {
    try {
      const options = [
        { value: "Pending", label: "Pending", color: "Yellow" },
        { value: "InProgress", label: "In Progress", color: "Blue" },
        { value: "Completed", label: "Completed", color: "Green" },
        { value: "OnHold", label: "On Hold", color: "Orange" },
        { value: "Cancelled", label: "Cancelled", color: "Red" },
        { value: "Blocked", label: "Blocked", color: "Gray" },
        { value: "UnderReview", label: "Under Review", color: "Purple" },
      ];
  
      // Insert options into MongoDB
      await TaskStatus.insertMany(options);
  
      res.status(200).json({ message: "Task statuses added successfully." });
    } catch (err) {
      console.error("Error adding task statuses:", err);
      res.status(500).json({ error: "Error adding task statuses" });
    }
  }
module.exports = taskstatus;
