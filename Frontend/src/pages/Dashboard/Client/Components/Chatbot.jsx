// src/components/Chatbot.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../../../../context/AppContext";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Chatbot = () => {
  const { backendUrl, userData, lawyerData } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(Date.now());
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  const AI_NAME = "LegalBot";
  const MESSAGE_LIMIT = 20;

  // Load chat history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(savedHistory);
  }, []);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: `Hello! I’m ${AI_NAME}, your assistant for legal case management under Sri Lankan law. Ask me anything about cases, lawyers, or our platform!`,
      },
    ]);
  }, [currentChatId]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/chatbot/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      console.log(`${AI_NAME} Response:`, data);

      if (!response.ok) {
        throw new Error(data.msg || "Failed to process request");
      }

      const botReply = { sender: "bot", text: data.reply || "I couldn’t find an answer for that." };
      setMessages((prev) => {
        const newMessages = [...prev, botReply];
        // Save to history
        setChatHistory((prevHistory) => {
          const updatedHistory = [
            { id: currentChatId, messages: newMessages, timestamp: Date.now() },
            ...prevHistory.filter((chat) => chat.id !== currentChatId),
          ];
          localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
          return updatedHistory;
        });
        return newMessages;
      });
    } catch (error) {
      console.error(`${AI_NAME} Error:`, error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I hit a snag! Let’s try that again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(Date.now());
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setShowHistory(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header
          displayName={userData?.fullName || lawyerData?.fullName || "User"}
          practiceAreas={lawyerData ? "Legal Assistance" : "Client"}
        />

        <div className="flex flex-1 lg:ml-64 xl:ml-72 mt-16">
          {/* History Sidebar */}
          {showHistory && (
            <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
              <h2 className="text-lg font-bold mb-4">Chat History</h2>
              {chatHistory.length === 0 ? (
                <p className="text-gray-400">No chats yet</p>
              ) : (
                chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => loadChat(chat.id)}
                    className="w-full text-left p-2 mb-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                  >
                    {new Date(chat.timestamp).toLocaleString()} ({chat.messages.length} messages)
                  </button>
                ))
              )}
            </div>
          )}

          {/* Chat Area */}
          <div className="flex-1 flex flex-col p-4">
            <div className="flex-1 overflow-y-auto mb-4 bg-gray-800 rounded-lg p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-2xl p-4 rounded-lg ${
                      msg.sender === "user" ? "bg-blue-600" : "bg-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-lg bg-gray-700">...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input and Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                {showHistory ? "Hide History" : "Show History"}
              </button>
              {messages.length >= MESSAGE_LIMIT && (
                <button
                  onClick={startNewChat}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                >
                  New Chat
                </button>
              )}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question here..."
                className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;