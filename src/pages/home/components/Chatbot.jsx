import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-80 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#1a4b84] dark:text-[#5da9e9]">Chat Assistance</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-700 dark:text-gray-200">How can I assist you today?</p>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#1a4b84] text-white p-3 rounded-full shadow-lg hover:bg-[#5da9e9] transition duration-300"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;