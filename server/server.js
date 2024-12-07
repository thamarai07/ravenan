// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// Local imports
const connectDB = require("./db");
const User = require("./models/models");
const {
  getUserData,
  login,
  taskstatus,
  getStatusdata,
  createtask,
  getTaskList,
  taskdetail,
  updatetask,
  deleteTask,
} = require("./controller");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

// Routes

// User registration
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (err) {
    const errorMessage =
      err.code === 11000
        ? "Please use a different email ID"
        : "Error saving user";
    res.status(500).json({ error: errorMessage, reason: err.code });
  }
});

// Other API endpoints
app.post("/api/login", login);
app.post("/api/user_data", getUserData);
app.post("/api/addtaskstatus", taskstatus);
app.get("/api/gettaskstatus", getStatusdata);
app.post("/api/createtask", createtask);
app.post("/api/gettasklist", getTaskList);
app.post("/api/taskdetail", taskdetail);
app.post("/api/updatetask", updatetask);
app.post("/api/deletetask", deleteTask);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});