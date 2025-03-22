import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../../../../context/AppContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { PaperAirplaneIcon, ArrowPathIcon, Bars3Icon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

const Chatbot = () => {
  const { backendUrl, userData, lawyerData } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(Date.now());
  const [showChatSidebar, setShowChatSidebar] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const AI_NAME = "Lexi";
  const MESSAGE_LIMIT = 20;

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(savedHistory);
  }, []);

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
      const response = await fetch(`${backendUrl}/api/chatbot/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.msg || "Failed to process request");
      }

      const botReply = { sender: "bot", text: data.response };
      setMessages((prev) => {
        const newMessages = [...prev, botReply];
        saveChatHistory(newMessages);
        return newMessages;
      });
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "<b>Error:</b><br>• Apologies, an issue occurred. Please try again." }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const saveChatHistory = (newMessages) => {
    setChatHistory((prevHistory) => {
      const chatName = newMessages.find((msg) => msg.sender === "user")?.text.slice(0, 20) || `Chat ${new Date().toLocaleTimeString()}`;
      const updatedHistory = [
        { id: currentChatId, name: chatName, messages: newMessages, timestamp: Date.now() },
        ...prevHistory.filter((chat) => chat.id !== currentChatId),
      ].slice(0, 10);
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const deleteChat = (chatId) => {
    setChatHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter((chat) => chat.id !== chatId);
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
      if (chatId === currentChatId) {
        setMessages([]);
        setCurrentChatId(Date.now());
      }
      return updatedHistory;
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(Date.now());
    setShowChatSidebar(false);
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setShowChatSidebar(false);
    }
  };

  const isChatLimitReached = messages.length >= MESSAGE_LIMIT;

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 xl:ml-72">
        <Header
          displayName={userData?.fullName || lawyerData?.fullName || "User"}
          practiceAreas={lawyerData ? "Legal Assistance" : "Client"}
        />
        <div className="flex-1 flex items-center justify-center p-6 mt-16">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl h-[80vh] relative overflow-hidden transition-all duration-300 border border-blue-100">
            {/* Main Chat Area */}
            <div className="flex flex-col h-full">
              {/* Toggle Sidebar Button */}
              {!showChatSidebar && (
                <button
                  onClick={() => setShowChatSidebar(true)}
                  className="absolute top-4 left-4 p-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg z-10"
                  title="Show Chat History"
                >
                  <Bars3Icon className="h-5 w-5" />
                </button>
              )}

              {messages.length === 0 ? (
                // Empty State: Elegant Centered Input
                <div className="flex flex-col items-center justify-center h-full p-8">
                  <p className="text-indigo-700 text-xl font-semibold mb-6 animate-[fadeIn_0.5s_ease-in-out] tracking-wide">
                    Welcome to Lexi—Your Expert Legal Companion
                  </p>
                  <div className="flex items-center gap-4 w-full max-w-lg">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about Sri Lankan law..."
                      ref={inputRef}
                      className="flex-1 p-4 bg-gray-50 border border-indigo-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 placeholder-gray-500 disabled:bg-gray-200 transition-all duration-300 shadow-sm text-lg"
                      disabled={loading || isChatLimitReached}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={loading || isChatLimitReached}
                      className="p-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full hover:from-indigo-700 hover:to-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                    >
                      <PaperAirplaneIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ) : (
                // Chat State: Messages Above, Input Below
                <>
                  <div className="flex-1 overflow-y-auto p-6 pt-16 bg-gradient-to-b from-white to-gray-50">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-6 animate-[slideUp_0.3s_ease-out]`}
                      >
                        <div
                          className={`max-w-lg p-5 rounded-2xl shadow-md ${
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                              : "bg-white text-gray-900 border-l-4 border-indigo-500"
                          } transition-all duration-200`}
                          style={{ whiteSpace: "pre-wrap" }}
                          dangerouslySetInnerHTML={{ __html: msg.text }}
                        />
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start mb-6">
                        <div className="p-5 rounded-2xl bg-gray-100 text-indigo-700 flex items-center gap-2 shadow-sm">
                          <span className="animate-pulse text-xl font-semibold">...</span>
                        </div>
                      </div>
                    )}
                    {isChatLimitReached && (
                      <div className="text-center text-indigo-600 text-sm mb-6 font-medium animate-[fadeIn_0.5s_ease-in-out]">
                        Chat limit reached. Please start a new conversation!
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="p-6 bg-gray-50 border-t border-indigo-100">
                    <div className="flex items-center gap-4 w-full max-w-lg mx-auto">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask your question..."
                        ref={inputRef}
                        className="flex-1 p-4 bg-white border border-indigo-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 placeholder-gray-500 disabled:bg-gray-200 transition-all duration-300 shadow-sm text-lg"
                        disabled={loading || isChatLimitReached}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={loading || isChatLimitReached}
                        className="p-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full hover:from-indigo-700 hover:to-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                      >
                        <PaperAirplaneIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Chatbot Sidebar */}
            {showChatSidebar && (
              <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-b from-indigo-50 to-blue-50 border-r border-indigo-200 p-6 flex flex-col shadow-xl z-20 animate-[slideIn_0.3s_ease-out]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-indigo-800 tracking-tight">Conversation History</h3>
                  <button
                    onClick={() => setShowChatSidebar(false)}
                    className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-full transition-all duration-200"
                    title="Hide Sidebar"
                  >
                    <XMarkIcon className="h-5 w-5 text-indigo-600" />
                  </button>
                </div>
                <button
                  onClick={startNewChat}
                  className="w-full p-3 mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md text-lg font-medium"
                >
                  Start New Conversation
                </button>
                <div className="flex-1 overflow-y-auto">
                  {chatHistory.length === 0 ? (
                    <p className="text-indigo-500 text-sm font-medium">No conversations yet</p>
                  ) : (
                    chatHistory.map((chat) => (
                      <div key={chat.id} className="flex items-center justify-between p-3 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm transition-all duration-150">
                        <button
                          onClick={() => loadChat(chat.id)}
                          className="flex-1 text-left truncate font-medium"
                        >
                          {chat.name}
                        </button>
                        <button
                          onClick={() => deleteChat(chat.id)}
                          className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all duration-200"
                          title="Delete Chat"
                        >
                          <TrashIcon className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;