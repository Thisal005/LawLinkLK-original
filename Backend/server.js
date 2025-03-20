// Backend/server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { WebSocketServer } from "ws";
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
import chatbotRoutes from "./routes/chatbot.route.js";
import { protectRoute } from "./middleware/protectRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Cookies:", req.cookies);
  next();
});

// CORS config
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/uploads", express.static("uploads"));
app.use("/uploads-chat", express.static("uploads-chat"));

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
app.use("/api/chatbot", chatbotRoutes);

app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({
    success: false,
    msg: "Internal Server Error",
  });
});

const startServer = async () => {
  try {
    await connectTomongoDB();
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

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
            }
          }
        } catch (error) {
          console.error("WebSocket message error:", error);
          ws.send(JSON.stringify({ type: "error", message: "Failed to process message" }));
        }
      });

      ws.on("close", () => {
        if (ws.userId) {
          global.clients.delete(ws.userId);
          console.log(`WebSocket client disconnected: ${ws.userId}`);
        }
      });

      ws.on("error", (error) => console.error("WebSocket error:", error));
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();