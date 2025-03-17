// server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { WebSocketServer } from "ws";
import axios from "axios";
import connectTomongoDB from "./db/connectTomongoDB.js";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRouter from "./routes/user.route.js";
import lawyerAuthRouter from "./routes/lawyerAuth.route.js";
import lawyerRouter from "./routes/lawyer.route.js";
import caseRouter from "./routes/case.route.js";
import taskRouter from "./routes/tasks.route.js";
import notificationRouter from "./routes/notification.route.js";
import noteRouter from "./routes/note.route.js";
import todoRouter from "./routes/todo.route.js";
import { protectRoute } from "./middleware/protectRoute.js";

// Import models
import User from "./models/user.model.js";
import Lawyer from "./models/lawyer.model.js";
import Case from "./models/case.model.js";
import Notification from "./models/notifications.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Cookies:", req.cookies);
  next();
});

const allowedOrigins = ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/uploads", express.static("uploads"));
app.use("/uploads-chat", express.static("uploads-chat"));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/user", userRouter);
app.use("/api/lawyer", lawyerAuthRouter);
app.use("/api/lawyer-data", lawyerRouter);
app.use("/api/case", caseRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/notes", noteRouter);
app.use("/api/todos", todoRouter);

// Chatbot Route
app.use("/api/chatbot", (req, res, next) => {
  // Middleware can be added here if needed
  next();
});

app.post("/api/chatbot/chat", protectRoute, async (req, res) => {
  const { message } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

  if (!message) {
    return res.status(400).json({ success: false, msg: "Message is required" });
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
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
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const server = app.listen(PORT, () => {
  connectTomongoDB();
  console.log(`Server running on port ${PORT}`);
});

// WebSocket Setup
global.clients = new Map();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "register") {
        global.clients.set(data.userId, ws);
        ws.userId = data.userId;
        console.log(`WebSocket client registered: ${data.userId}`);
        return;
      }
      if (data.type === "message") {
        const recipientWs = global.clients.get(data.receiverId);
        if (recipientWs && recipientWs.readyState === WebSocket.OPEN) {
          recipientWs.send(JSON.stringify({ type: "message", message: data.message }));
          console.log(`Message sent to ${data.receiverId}`);
        } else {
          console.log(`Recipient ${data.receiverId} not connected`);
        }
      }
    } catch (error) {
      console.error("WebSocket message error:", error);
    }
  });

  ws.on("close", () => {
    if (ws.userId) {
      global.clients.delete(ws.userId);
      console.log(`WebSocket client disconnected: ${ws.userId}`);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});