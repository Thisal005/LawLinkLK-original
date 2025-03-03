// backend/pages/auth/clientlogin/clientlogin.js
const express = require("express");
const router = express.Router();

// In-memory client data
const clients = [
  { email: "client@example.com", password: "clientpassword" }
];

// Client login endpoint
router.post("/", (req, res) => {
  const { email, password } = req.body;

  const client = clients.find(
    (c) => c.email === email && c.password === password
  );

  if (client) {
    res.json({ message: "Client login successful!", client });
  } else {
    res.status(401).json({ message: "Invalid client credentials" });
  }
});

module.exports = router;