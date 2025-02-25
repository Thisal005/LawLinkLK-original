import React, { useState } from "react";

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    // Save user preference in localStorage or cookies
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm animate-fadeIn">
      <p className="text-gray-700 dark:text-gray-200 mb-4">
        We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
      </p>
      <button
        onClick={handleAccept}
        className="bg-[#1a4b84] text-white px-4 py-2 rounded-md hover:bg-[#5da9e9] transition duration-300"
      >
        Accept
      </button>
    </div>
  );
};

export default CookiePopup;