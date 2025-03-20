// backend/routes/case.route.js
import express from "express";
import Case from "../models/case.model.js";
import Notification from "../models/notifications.model.js";
import { protectRoute } from "../middleware/protectRoute.js";
import lawyerAuth from "../middleware/lawyerAuth.js";
import { createCase } from "../controllers/case.controller.js";
import mongoose from "mongoose";

const caseRouter = express.Router();

const sendResponse = (res, status, success, data, msg) => {
  console.log(`Response sent - Status: ${status}, Msg: ${msg}`);
  res.status(status).json({ success, data, msg });
};

// Create a new case
caseRouter.post("/create-case", protectRoute, createCase);

// Get case details by ID
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

// Delete a case by ID (only if status is "pending")
caseRouter.delete("/:caseId", protectRoute, async (req, res) => {
  try {
    console.log("Delete case - req.user:", req.user);
    const { caseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(caseId)) {
      return sendResponse(res, 400, false, null, "Invalid case ID");
    }

    const caseData = await Case.findOne({
      _id: caseId,
      clientId: req.user._id,
    });

    if (!caseData) {
      return sendResponse(
        res,
        404,
        false,
        null,
        "Case not found or you are not authorized to delete it"
      );
    }

    if (caseData.status !== "pending") {
      return sendResponse(
        res,
        403,
        false,
        null,
        "You can only delete a case when its status is 'pending'."
      );
    }

    await Case.deleteOne({ _id: caseId, clientId: req.user._id });

    const notification = new Notification({
      userId: req.user._id,
      userType: "User",
      message: `Your case "${caseData.subject}" has been deleted.`,
      createdAt: new Date(),
      unread: true,
    });
    await notification.save();

    sendResponse(res, 200, true, null, "Case deleted successfully");
  } catch (error) {
    console.error("Error deleting case:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Get user notifications
caseRouter.get("/user/notifications", protectRoute, async (req, res) => {
  try {
    console.log("Get user notifications - req.user:", req.user);
    const userId = req.user._id.toString();

    const notifications = await Notification.find({ userId, userType: "User" })
      .sort({ createdAt: -1 })
      .limit(10);

    const message = notifications.length > 0
      ? "User notifications retrieved successfully"
      : "There are no notifications for you";
    sendResponse(res, 200, true, notifications || [], message);
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Mark all user notifications as read
caseRouter.post("/user/notifications/mark-all-read", protectRoute, async (req, res) => {
  try {
    console.log("Mark user notifications - req.user:", req.user);
    const userId = req.user._id.toString();

    const result = await Notification.updateMany(
      { userId, userType: "User", unread: true },
      { $set: { unread: false } }
    );

    const message = result.modifiedCount > 0
      ? "All user notifications marked as read"
      : "No unread notifications to mark as read";
    sendResponse(res, 200, true, null, message);
  } catch (error) {
    console.error("Error marking user notifications as read:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Get lawyer notifications
caseRouter.get("/lawyer/notifications", lawyerAuth, async (req, res) => {
  try {
    console.log("Get lawyer notifications - req.lawyer:", req.lawyer);
    const userId = req.lawyer._id.toString();

    const notifications = await Notification.find({ userId, userType: "Lawyer" })
      .sort({ createdAt: -1 })
      .limit(10);

    const message = notifications.length > 0
      ? "Lawyer notifications retrieved successfully"
      : "There are no notifications for you";
    sendResponse(res, 200, true, notifications || [], message);
  } catch (error) {
    console.error("Error fetching lawyer notifications:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Mark all lawyer notifications as read
caseRouter.post("/lawyer/notifications/mark-all-read", lawyerAuth, async (req, res) => {
  try {
    console.log("Mark lawyer notifications - req.lawyer:", req.lawyer);
    const userId = req.lawyer._id.toString();

    const result = await Notification.updateMany(
      { userId, userType: "Lawyer", unread: true },
      { $set: { unread: false } }
    );

    const message = result.modifiedCount > 0
      ? "All lawyer notifications marked as read"
      : "No unread notifications to mark as read";
    sendResponse(res, 200, true, null, message);
  } catch (error) {
    console.error("Error marking lawyer notifications as read:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Get pending cases count
caseRouter.get("/pending-count/:clientId", protectRoute, async (req, res) => {
  try {
    console.log("Get pending count - req.user:", req.user);
    const { clientId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return sendResponse(res, 400, false, null, "Invalid client ID");
    }

    if (req.user._id.toString() !== clientId) {
      return sendResponse(res, 403, false, null, "Unauthorized");
    }

    const count = await Case.countDocuments({
      clientId,
      status: "pending",
    });

    sendResponse(res, 200, true, { count }, "Pending cases count retrieved successfully");
  } catch (error) {
    console.error("Error fetching pending cases count:", error);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Get all unassigned cases for lawyers
caseRouter.get("/all", lawyerAuth, async (req, res) => {
  try {
    console.log("GET /api/case/all - Request received");
    console.log("req.lawyer:", req.lawyer);

    const currentDate = new Date();
    const cases = await Case.find({
      lawyerId: null,
      expiresAt: { $gt: currentDate },
    }).select("subject description _id");

    console.log("Fetched cases:", cases);

    if (!cases || cases.length === 0) {
      return sendResponse(res, 200, true, [], "No unassigned cases available.");
    }

    sendResponse(res, 200, true, cases, "All unassigned cases retrieved successfully");
  } catch (error) {
    console.error("Error fetching all cases:", error.message, error.stack);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

// Lawyer sends an offer
caseRouter.post("/offer/:caseId", lawyerAuth, async (req, res) => {
  try {
    const { caseId } = req.params;
    const lawyerId = req.lawyer._id;

    if (!mongoose.Types.ObjectId.isValid(caseId)) {
      return sendResponse(res, 400, false, null, "Invalid case ID");
    }

    const caseData = await Case.findById(caseId);
    if (!caseData || caseData.lawyerId) {
      return sendResponse(res, 404, false, null, "Case not found or already assigned");
    }

    const notification = new Notification({
      userId: caseData.clientId,
      userType: "User",
      message: `A lawyer is interested in your case: "${caseData.subject}"`,
      createdAt: new Date(),
      unread: true,
      metadata: { lawyerId, caseId },
    });
    await notification.save();

    const clientWs = global.clients.get(caseData.clientId.toString());
    if (clientWs && clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(
        JSON.stringify({
          type: "notification",
          message: `A lawyer is interested in your case: "${caseData.subject}"`,
        })
      );
    }

    sendResponse(res, 200, true, null, "Offer sent successfully");
  } catch (error) {
    console.error("Error sending offer:", error.message, error.stack);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
});

export default caseRouter;