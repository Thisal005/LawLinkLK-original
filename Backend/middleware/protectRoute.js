// middleware/protectRoute.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Lawyer from "../models/lawyer.model.js"; // Changed from Lawyers
import mongoose from "mongoose";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      console.log("No token found in cookies");
      return sendResponse(res, 401, false, null, "No token provided, authorization denied");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const userId = decoded.userId || decoded._id;
    if (!userId) {
      console.log("Token missing user ID");
      return sendResponse(res, 401, false, null, "Token missing user ID");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId format:", userId);
      return sendResponse(res, 401, false, null, "Invalid user ID in token");
    }

    const user = await User.findById(userId).select("-password");
    const lawyer = user ? null : await Lawyer.findById(userId).select("-password");

    if (!user && !lawyer) {
      console.log("No user or lawyer found for ID:", userId);
      return sendResponse(res, 401, false, null, "User or lawyer not found");
    }

    req.user = user || lawyer;
    console.log("req.user set:", req.user);
    next();
  } catch (error) {
    console.error("ProtectRoute error:", error.message);
    return sendResponse(res, 401, false, null, `Unauthorized: ${error.message}`);
  }
};

const sendResponse = (res, status, success, data, msg) => {
  res.status(status).json({ success, data, msg });
};

export { protectRoute };