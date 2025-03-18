// controllers/user.controller.js
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { uploadImage } from "../utills/uploadImage.js"; // Placeholder for photo upload

export const getUserData = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.json({ success: false, message: "Unauthorized. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        contact: user.contact,
        isVerified: user.isVerified,
        publicKey: user.publicKey,
        privateKey: user.privateKey,
        profilePic: user.profilePic, // Updated to match your model
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getPublicKey = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId).select("publicKey");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ publicKey: user.publicKey });
  } catch (err) {
    console.error("Error in getPublicKey controller:", err.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// New: Update user account settings
export const updateUser = async (req, res) => {
  try {
    const { fullName, contact } = req.body; // No phoneNumber in your model, sticking to contact
    const userId = req.user._id;

    let updateData = { fullName, contact };

    // Handle profile picture upload if present
    if (req.file) {
      const profilePicUrl = await uploadImage(req.file); // Replace with your upload logic
      updateData.profilePic = profilePicUrl;
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      userData: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        contact: user.contact,
        profilePic: user.profilePic,
      },
      message: "Account updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};