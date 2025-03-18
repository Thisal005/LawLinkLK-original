// controllers/case.controller.js
import Case from "../models/case.model.js";
import Notification from "../models/notifications.model.js"; // Fixed typo from your code

const sendResponse = (res, status, success, data, msg) => {
  res.status(status).json({ success, data, msg });
};

// Existing createCase (tweaked for consistency)
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

// Get case details by ID (for CaseDetails.jsx)
export const getCaseDetails = async (req, res) => {
  try {
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
      caseData.lawyerId?._id.toString() !== req.user._id.toString()
    ) {
      return sendResponse(res, 403, false, null, "Unauthorized");
    }

    sendResponse(res, 200, true, caseData, "Case retrieved successfully");
  } catch (error) {
    console.error("Error fetching case:", error.message);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
};

// Delete case by ID (for CaseDetails.jsx)
export const deleteCase = async (req, res) => {
  try {
    const { caseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(caseId)) {
      return sendResponse(res, 400, false, null, "Invalid case ID");
    }

    const caseData = await Case.findOneAndDelete({
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

    // Optional: Notify user of deletion
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
    console.error("Error deleting case:", error.message);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
};

// Existing endpoints from your Sidebar (for completeness)
export const getUserCases = async (req, res) => {
  try {
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
    console.error("Error fetching user cases:", error.message);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
};

export const getPendingCasesCount = async (req, res) => {
  try {
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
    console.error("Error fetching pending cases count:", error.message);
    sendResponse(res, 500, false, null, `Server error: ${error.message}`);
  }
};