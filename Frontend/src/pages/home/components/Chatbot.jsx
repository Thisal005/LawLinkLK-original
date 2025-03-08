import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

// Load Zapier web component script
const loadZapierScript = () => {
  const script = document.createElement("script");
  script.src = "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
  script.type = "module";
  script.async = true;
  document.body.appendChild(script);
  return () => document.body.removeChild(script);
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotId = "cm80dmx99001z1zfygess9gcb"; 

  useEffect(() => {
    const cleanup = loadZapierScript();
    return cleanup;
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg w-[400px] h-[500px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-[#1a4b84] dark:text-[#5da9e9]">
              Ask from Lexi
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Zapier Chatbot Container */}
          <div className="w-[400px] h-[600px] bg-white rounded-lg shadow-xl overflow-hidden">
          <zapier-interfaces-chatbot-embed
            is-popup="false"
            chatbot-id="cm80dmx99001z1zfygess9gcb"
            height="450px"
            width="400px"
          />
        </div>

         
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#1a4b84] text-white p-4 rounded-full shadow-lg hover:bg-[#5da9e9] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#5da9e9] focus:ring-opacity-50"
          aria-label="Open chatbot"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;