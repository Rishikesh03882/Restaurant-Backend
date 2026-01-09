require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  message: String,
});

const Contact = mongoose.model("Contact", ContactSchema);

// API
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, date, time, message } = req.body;
    const newContact = new Contact({ name, email, phone, date, time, message });
    await newContact.save();
    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Test routes
app.get("/", (req, res) => {
  res.send("Restaurant backend is running 🚀");
});

app.get("/home", (req, res) => {
  res.send("Welcome");
});

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
