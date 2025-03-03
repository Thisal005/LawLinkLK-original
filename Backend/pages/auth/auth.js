// backend/pages/auth/auth.js
const express = require("express");
const router = express.Router();

// Import authentication routes
const clientLoginRouter = require("./clientlogin/clientlogin.js");
const lawyerLoginRouter = require("./lawyerlogin/LawyerLogin.js");
const registrationRouter = require("./registration/registration.js");

// Use authentication routes
router.use("/client-login", clientLoginRouter);
router.use("/lawyer-login", lawyerLoginRouter);
router.use("/register", registrationRouter);

module.exports = router;