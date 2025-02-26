import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-[#1a4b84] dark:text-[#5da9e9] mb-4">404</h1>
      <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">Page Not Found</p>
      <Link to="/" className="bg-[#1a4b84] text-white px-6 py-2 rounded-md hover:bg-[#5da9e9] transition duration-300">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;