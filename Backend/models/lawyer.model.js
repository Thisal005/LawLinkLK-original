import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  lawyerID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String },
  documentForVerification: { type: String },
  verifyotp: { type: String },
  verifyOtpExpires: { type: Number },
  publicKey: { type: String },
  privateKey: { type: String },
  isVerified: { type: Boolean, default: false },
  resetOtp: { type: String },
  resetOtpExpires: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Lawyer", lawyerSchema);