// controllers/case.controller.js
import Case from "../models/case.model.js";
import Notification from "../models/notifications.model.js";

const sendResponse = (res, status, success, data, msg) => {
  res.status(status).json({ success, data, msg });
};

export const createCase = async (req, res) => {
  try {
    console.log("Create case - req.user:", req.user);
    console.log("Request body:", req.body);

    const { subject, caseType, district, courtDate, description } = req.body;
    const clientId = req.user._id.toString();

    if (!subject || !caseType || !district || !courtDate || !description) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "All fields (subject, caseType, district, courtDate, description) are required"
      );
    }

    const existingCase = await Case.findOne({ clientId, status: { $in: ["pending", "ongoing"] } });
    if (existingCase) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "You already have a pending or ongoing case. Only one active case is allowed per client."
      );
    }

    // Added check for 3 pending cases limit
    const pendingCount = await Case.countDocuments({ clientId, status: "pending" });
    if (pendingCount >= 3) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "You have reached the limit of 3 pending cases."
      );
    }

    const newCase = new Case({
      clientId,
      lawyerId: null,
      subject,
      caseType,
      district,
      courtDate: new Date(courtDate),
      description,
      status: "pending",
      createdAt: new Date(), // Explicitly set for clarity
    });

    await newCase.save();

    const notification = new Notification({
      userId: clientId,
      userType: "User",
      message: `Your case "${subject}" has been posted successfully and is pending lawyer acceptance.`,
      createdAt: new Date(),
      unread: true,
    });
    await notification.save();

    sendResponse(res, 201, true, newCase, "Case created successfully");
  } catch (error) {
    console.error("Error in createCase controller:", error.message);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
};