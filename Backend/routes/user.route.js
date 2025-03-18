// routes/user.route.js
import express from "express";
import User from "../models/user.model.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserData, getPublicKey, updateUser } from "../controllers/user.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temp storage, adjust for cloud storage

// Get user's data (for logged-in user)
router.get("/data", protectRoute, getUserData);

// Get user's public key by ID (for decryption)
router.get("/:id", protectRoute, getPublicKey);

// Update user account settings
router.put("/update", protectRoute, upload.single("profilePic"), updateUser);

export default router;