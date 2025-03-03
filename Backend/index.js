// backend/index.js
require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let users = [];

// Import auth routes
const authRouter = require("./pages/auth/auth");

// Use auth routes
app.use("/api/auth", authRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to LawLinkLK Backend!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});