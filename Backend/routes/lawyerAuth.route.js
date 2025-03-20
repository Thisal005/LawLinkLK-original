import express from "express";
import lawyerAuth from "../middleware/lawyerAuth.js";
import {
  signup,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  sendRestPasswordOtp,
  resetPassword,
  newPassword,
} from "../controllers/lawyerauth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-otp", sendVerifyOtp);
router.post("/verify-email", verifyEmail);
router.post("/send-reset-otp", sendRestPasswordOtp);
router.post("/reset-password", resetPassword);
router.post("/new-password", newPassword);

// Added to match AppContext's getLawyerData
router.get("/data", lawyerAuth, (req, res) => {
  res.status(200).json({
    success: true,
    UserData: {
      id: req.lawyer._id,
      email: req.lawyer.email,
      name: req.lawyer.fullName, // Match signup/login naming
      fullName: req.lawyer.fullName,
      username: req.lawyer.username,
    },
  });
});

export default router;