// routes/case.route.js
import express from "express";
import Case from "../models/case.model.js";
import { protectRoute } from "../middleware/protectRoute.js";

const caseRouter = express.Router();

// Create a new case (replacing createCase controller)
caseRouter.post("/create-case", protectRoute, async (req, res) => {
  try {
    const { subject, caseType, district, courtDate, description } = req.body;
    const clientId = req.user._id.toString(); // From authenticated user

    // Check if the client already has a case
    const existingCase = await Case.findOne({ clientId });
    if (existingCase) {
      return res.status(400).json({ msg: "You already have an active case. Only one case is allowed per client." });
    }

    // Create new case
    const newCase = new Case({
      clientId,
      lawyerId: null, // No lawyer assigned yet
      subject,
      caseType,
      district,
      courtDate,
      description,
      status: "ongoing", // Default status
    });

    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    console.error("Error creating case:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get case details by _id
caseRouter.get("/:caseId", protectRoute, async (req, res) => {
  try {
    const { caseId } = req.params;
    const caseData = await Case.findById(caseId)
      .populate("clientId", "fullName email")
      .populate("lawyerId", "fullName email");

    if (!caseData) {
      return res.status(404).json({ msg: "Case not found" });
    }

    if (
      caseData.clientId._id.toString() !== req.user._id.toString() &&
      (caseData.lawyerId?._id.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    res.status(200).json(caseData);
  } catch (err) {
    console.error("Error fetching case:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get case participants
caseRouter.get("/:caseId/participants", protectRoute, async (req, res) => {
  try {
    const { caseId } = req.params;
    const caseData = await Case.findById(caseId)
      .populate("clientId", "_id")
      .populate("lawyerId", "_id");

    if (!caseData) {
      return res.status(404).json({ msg: "Case not found" });
    }

    if (
      caseData.clientId._id.toString() !== req.user._id.toString() &&
      (caseData.lawyerId?._id.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    res.status(200).json({
      success: true,
      data: {
        clientId: caseData.clientId._id.toString(),
        lawyerId: caseData.lawyerId?._id.toString() || null,
      },
    });
  } catch (error) {
    console.error("Error fetching case participants:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all cases for a user (client or lawyer)
caseRouter.get("/user/:userId", protectRoute, async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const cases = await Case.find({
      $or: [{ clientId: userId }, { lawyerId: userId }],
    })
      .populate("clientId", "fullName email")
      .populate("lawyerId", "fullName email");

    res.status(200).json(cases || []);
  } catch (error) {
    console.error("Error fetching user cases:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

export default caseRouter;