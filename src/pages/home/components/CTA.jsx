import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section id="CTA" section className="py-16 bg-gradient-to-r from-[#1a4b84] to-[#5da9e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-200 mb-8">Join LawLinkLK today and experience seamless legal connections.</p>
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

export default CTA;