// models/case.model.js
import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    default: null,
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
    trim: true,
  },
  caseType: {
    type: String,
    required: [true, "Case type is required"],
    enum: [
      "criminal", "civil", "family",
      "theft-and-burglary", "drug-offenses", "personal-injury",
      "divorce", "employment-law", "contract-disputes", "immigration",
      "other"
    ],
  },
  district: {
    type: String,
    required: [true, "District is required"],
    enum: [
      "colombo", "gampaha", "kalutara",
      "kandy", "matale", "nuwara eliya",
      "galle", "matara", "hambantota",
      "jaffna", "kilinochchi", "mannar", "vavuniya", "mullaitivu",
      "batticaloa", "ampara", "trincomalee",
      "kurunegala", "puttalam",
      "anuradhapura", "polonnaruwa",
      "badulla", "monaragala",
      "ratnapura", "kegalle"
    ],
  },
  courtDate: {
    type: Date,
    required: [true, "Court date is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "ongoing", "completed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Case = mongoose.model("Case", caseSchema);

export default Case;