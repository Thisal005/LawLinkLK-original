// controllers/chatbot.controller.js
import axios from "axios";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

let cachedPdfContent = "";
let lastRefreshTime = 0;
const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

const refreshPdfContent = async () => {
  const pdfDir = path.join(__dirname, "../ChatbotPdf");
  let newContent = "";
  try {
    const files = fs.readdirSync(pdfDir).filter((file) => file.endsWith(".pdf"));
    for (const file of files) {
      const filePath = path.join(pdfDir, file);
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      newContent += `\n\n--- Content from ${file} ---\n${data.text.slice(0, 10000)}`; // Limit per file
    }
    if (!newContent) {
      newContent = "Default content: This is a Sri Lankan legal case management platform.";
    }
  } catch (error) {
    console.error("Error reading PDFs:", error);
    newContent = "Default content: This is a Sri Lankan legal case management platform.";
  }
  cachedPdfContent = newContent;
  lastRefreshTime = Date.now();
  console.log("PDF content refreshed. Length:", cachedPdfContent.length);
};

// Initial load
refreshPdfContent();

const chatWithLegalBot = async (req, res) => {
  const { message } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

  if (!message) {
    return res.status(400).json({ success: false, msg: "Message is required" });
  }

  // Refresh cache if needed
  if (Date.now() - lastRefreshTime > REFRESH_INTERVAL) {
    await refreshPdfContent();
  }

  const projectScope = `
    You are LegalBot, an AI assistant for a legal case management platform focused on Sri Lankan law. 
    Your purpose is to assist users with questions about managing legal cases, interacting with lawyers, 
    and using our platform's features (e.g., posting cases, tracking statuses, notifications) under 
    Sri Lankan legal context. Only answer questions related to this scope. If asked "What can you do?", 
    respond: "I’m here to help you with any legal concerns about Sri Lankan law and our case management 
    platform." For unrelated questions, say: "I’m here to assist with Sri Lankan legal case management 
    only. Please ask a relevant question!" Use the following documents as your knowledge base:
    ${cachedPdfContent}
  `;

  const isRelevant = /case|lawyer|legal|platform|notification|task|status|court|sri lanka/i.test(message);
  if (!isRelevant) {
    if (message.toLowerCase().includes("what can you do")) {
      return res.status(200).json({
        success: true,
        reply: "I’m here to help you with any legal concerns about Sri Lankan law and our case management platform.",
      });
    }
    return res.status(200).json({
      success: true,
      reply: "I’m here to assist with Sri Lankan legal case management only. Please ask a relevant question!",
    });
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: `${projectScope}\n\nUser question: ${message}` },
            ],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const reply = response.data.candidates[0]?.content?.parts[0]?.text || "No response";
    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("LegalBot Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, msg: "Failed to process request" });
  }
};

const uploadChatbotPDF = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, msg: "No PDF file uploaded" });
  }
  // Trigger a refresh after upload
  refreshPdfContent();
  res.status(200).json({ success: true, msg: "PDF uploaded successfully" });
};

export { chatWithLegalBot, uploadChatbotPDF };