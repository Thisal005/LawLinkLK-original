import React from "react";
import { Briefcase, Globe, Users, Shield } from "lucide-react"; // Removed Handshake
import aboutus from "../../../../src/assets/home/image.jpg"; // Image path

const About = () => {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={aboutus}
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold text-[#1a4b84] dark:text-[#5da9e9] mb-6">
              About LawLinkLK
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-8">
              LawLinkLK is a revolutionary platform designed to connect clients with legal professionals in a secure, transparent, and efficient manner. Our goal is to make legal services accessible to everyone while maintaining the highest ethical standards.
            </p>
            <div className="space-y-6">
              {/* Vision Card */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Globe className="text-[#1a4b84] dark:text-[#5da9e9]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a4b84] dark:text-[#5da9e9]">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    To transform the legal industry by creating a seamless connection between clients and lawyers, ensuring justice is accessible to all.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Briefcase className="text-[#1a4b84] dark:text-[#5da9e9]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a4b84] dark:text-[#5da9e9]">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    To provide a reliable and ethical platform that empowers clients to find the right legal assistance and enables lawyers to serve their communities effectively.
                  </p>
                </div>
              </div>

              {/* Values Card */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Shield className="text-[#1a4b84] dark:text-[#5da9e9]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a4b84] dark:text-[#5da9e9]">
                    Our Values
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    We are committed to integrity, transparency, and professionalism. Our platform ensures that all interactions are secure, private, and free from unethical practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;