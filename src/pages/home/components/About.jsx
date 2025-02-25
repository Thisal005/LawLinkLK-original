import React from "react";
import { Briefcase, Globe, Users } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-800"> {/* Add id="about" here */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="/src/assets/home/about.jpg"
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold text-[#1a4b84] dark:text-[#5da9e9] mb-6">About Us</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-8">
              LawLinkLK is a platform designed to bridge the gap between clients and legal professionals. Our mission is to make legal services accessible, transparent, and efficient.
            </p>
            <div className="space-y-6">
              {/* Vision Card */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Globe className="text-[#1a4b84] dark:text-[#5da9e9]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a4b84] dark:text-[#5da9e9]">Our Vision</h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    To revolutionize the legal industry by fostering seamless connections.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Briefcase className="text-[#1a4b84] dark:text-[#5da9e9]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a4b84] dark:text-[#5da9e9]">Our Mission</h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    To empower clients and lawyers with a reliable and efficient platform.
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