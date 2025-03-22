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
  const chatContainerRef = useRef(null); // Ref for the chat container

  const AI_NAME = "Lexi";
  const MESSAGE_LIMIT = 20;

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(savedHistory);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showChatSidebar &&
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target)
      ) {
        setShowChatSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showChatSidebar]);

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
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 xl:ml-72">
        <Header
          displayName={userData?.fullName || lawyerData?.fullName || "User"}
          practiceAreas={lawyerData ? "Legal Assistance" : "Client"}
        />
        <div className="flex-1 flex items-center justify-center p-4 mt-16">
          <div
            ref={chatContainerRef} // Attach ref to the chat container
            className="w-full max-w-5xl bg-white rounded-xl shadow-md h-[85vh] relative overflow-hidden transition-all duration-300 border border-slate-200"
          >
            {/* Main Chat Area */}
            <div className="flex flex-col h-full">
              {/* Toggle Sidebar Button */}
              {!showChatSidebar && (
                <button
                  onClick={() => setShowChatSidebar(true)}
                  className="absolute top-4 left-4 p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-200 z-10"
                  title="Show Chat History"
                >
                  <Bars3Icon className="h-5 w-5" />
                </button>
              )}

              {messages.length === 0 ? (
                // Empty State: Modern Centered Input
                <div className="flex flex-col items-center justify-center h-full p-8">
                  <div className="mb-8 text-center">
                    <h2 className="text-slate-800 text-2xl font-semibold mb-2 tracking-tight">
                      Lexi
                    </h2>
                    <p className="text-slate-600 max-w-md">
                      Your expert legal companion for Sri Lankan law inquiries
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full max-w-xl bg-slate-50 p-1 rounded-full border border-slate-200">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about Sri Lankan law..."
                      ref={inputRef}
                      className="flex-1 p-3 bg-transparent border-none rounded-full focus:outline-none text-slate-800 placeholder-slate-400 text-base"
                      disabled={loading || isChatLimitReached}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={loading || isChatLimitReached}
                      className="p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                // Chat State: Messages Above, Input Below
                <>
                  <div className="flex-1 overflow-y-auto p-6 pt-16 bg-white">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
                      >
                        <div
                          className={`max-w-2x1 p-4 rounded-lg ${
                            msg.sender === "user"
                              ? "bg-slate-800 text-white"
                              : "bg-slate-100 text-slate-800"
                          } shadow-sm`}
                          style={{ whiteSpace: "pre-wrap" }}
                          dangerouslySetInnerHTML={{ __html: msg.text }}
                        />
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start mb-4">
                        <div className="p-4 rounded-lg bg-slate-50 text-slate-500 flex items-center shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {isChatLimitReached && (
                      <div className="text-center text-slate-500 text-sm mb-4 font-medium p-2 bg-slate-50 rounded-lg">
                        Message limit reached. Please start a new conversation.
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="p-4 bg-white border-t border-slate-100">
                    <div className="flex items-center gap-3 w-full max-w-2xl mx-auto bg-slate-50 p-1 rounded-full border border-slate-200">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        ref={inputRef}
                        className="flex-1 p-3 bg-transparent border-none rounded-full focus:outline-none text-slate-800 placeholder-slate-400 text-base"
                        disabled={loading || isChatLimitReached}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={loading || isChatLimitReached}
                        className="p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <PaperAirplaneIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Chatbot Sidebar */}
            {showChatSidebar && (
              <div className="absolute inset-y-0 left-0 w-80 bg-white border-r border-slate-200 flex flex-col shadow-lg z-20">
                <div className="p-4 border-b border-slate-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-slate-800">Conversations</h3>
                    <button
                      onClick={() => setShowChatSidebar(false)}
                      className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all duration-200"
                      title="Hide Sidebar"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    onClick={startNewChat}
                    className="w-full mt-3 p-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <span>New Conversation</span>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3">
                  {chatHistory.length === 0 ? (
                    <p className="text-slate-500 text-sm p-3">No conversations yet</p>
                  ) : (
                    chatHistory.map((chat) => (
                      <div 
                        key={chat.id} 
                        className={`mb-1 rounded-lg ${currentChatId === chat.id ? 'bg-slate-100' : 'hover:bg-slate-50'} transition-colors duration-150`}
                      >
                        <div className="flex items-center justify-between p-3 text-slate-700 text-sm">
                          <button
                            onClick={() => loadChat(chat.id)}
                            className="flex-1 text-left truncate font-medium"
                          >
                            {chat.name}
                          </button>
                          <button
                            onClick={() => deleteChat(chat.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-full transition-all duration-200"
                            title="Delete Chat"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
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