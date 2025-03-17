// Backend/routes/chatbot.routes.js
import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { chatWithLegalBot, uploadChatbotFile, initChatbot } from "../controllers/chatbot.controller.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "ChatbotFiles/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = file.originalname.split(".").pop();
    cb(null, `LegalDoc-${timestamp}.${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype === "text/plain") {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs and text files are allowed"));
    }
  },
});

const router = express.Router();

router.get("/init", protectRoute, initChatbot);
router.post("/ask", protectRoute, chatWithLegalBot);
router.post("/upload-file", protectRoute, upload.single("file"), uploadChatbotFile);

export default router;