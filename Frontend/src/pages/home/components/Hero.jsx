import React from "react";
import { Link } from "react-router-dom";
import homeImage from "../../../assets/home/home.jpg"; // Import the image

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-start"
      style={{
        backgroundImage: `url(${homeImage})`, // Use the imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a4b84] to-[#5da9e9] opacity-75"></div>

      {/* Content */}
      <div className="relative text-left max-w-2xl px-8 text-white">
        <h1 className="text-6xl font-bold mb-6 animate-glow">
          Connecting You to the Right Legal Expertise!
        </h1>
        <p className="text-xl mb-8">
          Find all the legal help you need at your fingertips.
        </p>
        <div className="space-x-4">
          <Link
            to="/auth/client-login"
            className="bg-white text-[#1a4b84] px-6 py-3 rounded-md hover:bg-[#5da9e9] hover:text-white transition duration-300"
          >
            Join as a Client
          </Link>
          <Link
            to="/auth/lawyer-login"
            className="bg-transparent border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#1a4b84] transition duration-300"
          >
            Join as a Lawyer
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;