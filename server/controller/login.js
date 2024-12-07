const User = require("../models/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "d2e408c5d245f3f56bba9cbe81b45699abef712b6a0ed85283d5a9f26fc5a687";
const login =async (req, res) => {
    const { name, password } = req.body;
  
    try {
      const user = await User.findOne({ name });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id, name: user.name }, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ message: "Login successful", token, userId: user._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error", reason: err });
    }
  }

  module.exports = login;