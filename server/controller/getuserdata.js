const User = require("../models/models");

const getUserData = async (req, res) => {
  try {
    const { Data } = req.body; 
    if (!Data) {
      return res.status(400).json({ error: "Data (id) is required" });
    }

    const user = await User.findById(Data);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user", reason: err.message });
  }
};

module.exports = getUserData;
