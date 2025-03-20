import jwt from "jsonwebtoken";
import Lawyer from "../models/lawyer.model.js";

const lawyerAuth = async (req, res, next) => {
  try {
    console.log("lawyerAuth - Starting");
    console.log("Cookies:", req.cookies);

    const token = req.cookies.jwt; // Match controller's cookie name
    if (!token) {
      console.log("lawyerAuth - No token");
      return res.status(401).json({ success: false, msg: "Unauthorized: No token provided" });
    }

    console.log("lawyerAuth - Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("lawyerAuth - Decoded:", decoded);

    const lawyer = await Lawyer.findById(decoded.id).select("-password"); // Match controller's 'id'
    if (!lawyer) {
      console.log("lawyerAuth - No lawyer for ID:", decoded.id);
      return res.status(401).json({ success: false, msg: "Unauthorized: Lawyer not found" });
    }

    console.log("lawyerAuth - Success:", lawyer);
    req.lawyer = lawyer;
    next();
  } catch (err) {
    console.error("lawyerAuth - Error:", err.message, err.stack);
    return res.status(401).json({ success: false, msg: `Unauthorized: ${err.message}` });
  }
};

export default lawyerAuth;