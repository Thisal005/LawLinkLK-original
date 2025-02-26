import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import loadinglogo from "../../../src/assets/home/logo1.png"; // Logo image path

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-[#1a4b84] to-[#5da9e9] z-50">
      <div className="text-center animate-fadeIn">
        {/* Logo */}
        <div className="animate-bounce">
          <img
            src={loadinglogo} // Replace with your logo path
            alt="LawLinkLK Logo"
            className="w-24 h-24 mx-auto mb-4"
          />
        </div>

        {/* Loading Spinner */}
        <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />

        {/* Text */}
        <p className="text-xl text-white font-semibold animate-pulse">
          Connecting you to legal expertise...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;