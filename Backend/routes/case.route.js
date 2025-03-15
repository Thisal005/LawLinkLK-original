// routes/case.route.js
import express from "express";
import Case from "../models/case.model.js";
import Notification from "../models/notifications.model.js";
import { protectRoute } from "../middleware/protectRoute.js";
import mongoose from "mongoose";

const caseRouter = express.Router();

// Helper function for consistent responses
const sendResponse = (res, status, success, data, msg) => {
  res.status(status).json({ success, data, msg });
};

// Create a new case
caseRouter.post("/create-case", protectRoute, async (req, res) => {
  try {
    console.log("Create case - req.user:", req.user);
    const { subject, caseType, district, courtDate, description } = req.body;
    const clientId = req.user?._id?.toString();

    if (!clientId || !mongoose.Types.ObjectId.isValid(clientId)) {
      return sendResponse(res, 401, false, null, "Unauthorized: Invalid or missing user ID");
    }

    if (!subject || !caseType || !district || !courtDate || !description) {
      return sendResponse(res, 400, false, null, "All fields (subject, caseType, district, courtDate, description) are required");
    }

    const existingCase = await Case.findOne({ clientId });
    if (existingCase) {
      return sendResponse(res, 400, false, null, "You already have an active case. Only one case is allowed per client.");
    }

    const newCase = new Case({
      clientId,
      lawyerId: null,
      subject,
      caseType,
      district,
      courtDate,
      description,
      status: "ongoing",
    });

    await newCase.save();

    const notification = new Notification({
      userId: clientId,
      userType: "User",
      message: `Your case "${subject}" has been posted successfully.`,
      createdAt: new Date(),
      unread: true,
    });
    await notification.save();

    sendResponse(res, 201, true, newCase, "Case created successfully");
  } catch (error) {
    console.error("Error creating case:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Get case details by _id
caseRouter.get("/:caseId", protectRoute, async (req, res) => {
  try {
    console.log("Get case - req.user:", req.user);
    const { caseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(caseId)) {
      return sendResponse(res, 400, false, null, "Invalid case ID");
    }

    const caseData = await Case.findById(caseId)
      .populate("clientId", "fullName email")
      .populate("lawyerId", "fullName email");

    if (!caseData) {
      return sendResponse(res, 404, false, null, "Case not found");
    }

    if (
      caseData.clientId._id.toString() !== req.user._id.toString() &&
      (caseData.lawyerId?._id.toString() !== req.user._id.toString())
    ) {
      return sendResponse(res, 403, false, null, "Unauthorized");
    }

    sendResponse(res, 200, true, caseData, "Case retrieved successfully");
  } catch (error) {
    console.error("Error fetching case:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Get case participants
caseRouter.get("/:caseId/participants", protectRoute, async (req, res) => {
  try {
    console.log("Get participants - req.user:", req.user);
    const { caseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(caseId)) {
      return sendResponse(res, 400, false, null, "Invalid case ID");
    }

    const caseData = await Case.findById(caseId)
      .populate("clientId", "_id")
      .populate("lawyerId", "_id");

    if (!caseData) {
      return sendResponse(res, 404, false, null, "Case not found");
    }

    if (
      caseData.clientId._id.toString() !== req.user._id.toString() &&
      (caseData.lawyerId?._id.toString() !== req.user._id.toString())
    ) {
      return sendResponse(res, 403, false, null, "Unauthorized");
    }

    const participants = {
      clientId: caseData.clientId._id.toString(),
      lawyerId: caseData.lawyerId?._id.toString() || null,
    };

    sendResponse(res, 200, true, participants, "Participants retrieved successfully");
  } catch (error) {
    console.error("Error fetching case participants:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Get all cases for a user (client or lawyer)
caseRouter.get("/user/:userId", protectRoute, async (req, res) => {
  try {
    console.log("Get user cases - req.user:", req.user);
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendResponse(res, 400, false, null, "Invalid user ID");
    }

    if (req.user._id.toString() !== userId) {
      return sendResponse(res, 403, false, null, "Unauthorized");
    }

    const cases = await Case.find({
      $or: [{ clientId: userId }, { lawyerId: userId }],
    })
      .populate("clientId", "fullName email")
      .populate("lawyerId", "fullName email");

    sendResponse(res, 200, true, cases || [], "User cases retrieved successfully");
  } catch (error) {
    console.error("Error fetching user cases:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Get user notifications
caseRouter.get("/user/notifications", protectRoute, async (req, res) => {
  try {
    console.log("Get user notifications - req.user:", req.user);
    const userId = req.user?._id?.toString();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId:", userId);
      return sendResponse(res, 401, false, [], "Unauthorized: Invalid or missing user ID");
    }

    const notifications = await Notification.find({ userId, userType: "User" })
      .sort({ createdAt: -1 })
      .limit(10);

    const message = notifications.length > 0 ? "User notifications retrieved successfully" : "No notifications to show";
    sendResponse(res, 200, true, notifications || [], message);
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    sendResponse(res, 200, true, [], "No notifications to show");
  }
});

// Mark all user notifications as read
caseRouter.post("/user/notifications/mark-all-read", protectRoute, async (req, res) => {
  try {
    console.log("Mark user notifications - req.user:", req.user);
    const userId = req.user?._id?.toString();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return sendResponse(res, 401, false, null, "Unauthorized: Invalid or missing user ID");
    }

    const result = await Notification.updateMany(
      { userId, userType: "User", unread: true },
      { $set: { unread: false } }
    );

    const message = result.modifiedCount > 0 ? "All user notifications marked as read" : "No unread notifications to mark as read";
    sendResponse(res, 200, true, null, message);
  } catch (error) {
    console.error("Error marking user notifications as read:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Get lawyer notifications
caseRouter.get("/lawyer/notifications", protectRoute, async (req, res) => {
  try {
    console.log("Get lawyer notifications - req.user:", req.user);
    const userId = req.user?._id?.toString();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId:", userId);
      return sendResponse(res, 401, false, [], "Unauthorized: Invalid or missing user ID");
    }

    const notifications = await Notification.find({ userId, userType: "Lawyer" })
      .sort({ createdAt: -1 })
      .limit(10);

    const message = notifications.length > 0 ? "Lawyer notifications retrieved successfully" : "No notifications to show";
    sendResponse(res, 200, true, notifications || [], message);
  } catch (error) {
    console.error("Error fetching lawyer notifications:", error);
    sendResponse(res, 200, true, [], "No notifications to show");
  }
});

// Mark all lawyer notifications as read
caseRouter.post("/lawyer/notifications/mark-all-read", protectRoute, async (req, res) => {
  try {
    console.log("Mark lawyer notifications - req.user:", req.user);
    const userId = req.user?._id?.toString();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return sendResponse(res, 401, false, null, "Unauthorized: Invalid or missing user ID");
    }

    const result = await Notification.updateMany(
      { userId, userType: "Lawyer", unread: true },
      { $set: { unread: false } }
    );

    const message = result.modifiedCount > 0 ? "All lawyer notifications marked as read" : "No unread notifications to mark as read";
    sendResponse(res, 200, true, null, message);
  } catch (error) {
    console.error("Error marking lawyer notifications as read:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

export default caseRouter;