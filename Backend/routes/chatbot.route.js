// routes/chatbot.route.js
import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { chatWithLegalBot, uploadChatbotPDF } from "../controllers/chatbot.controller.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "ChatbotPdf/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `SriLankanLegalGuide-${timestamp}.pdf`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs are allowed"));
    }
  },
});

const router = express.Router();

router.post("/chat", protectRoute, chatWithLegalBot);
router.post("/upload-pdf", protectRoute, upload.single("pdf"), uploadChatbotPDF);

export default router;