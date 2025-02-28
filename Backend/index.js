// index.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Mock user database
const users = [
  { email: "test@example.com", password: "password" }
];

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful!", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});