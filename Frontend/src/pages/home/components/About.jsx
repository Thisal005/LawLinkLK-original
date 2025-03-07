import React from "react";
import { Globe, Briefcase, Shield } from "lucide-react"; // Updated icons to match image
import aboutus from "../../../../src/assets/home/image.jpg"; // Image path

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image Card */}
          <div className="relative group transform hover:-translate-y-2 transition-all duration-300">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
              <img
                src={aboutus}
                alt="About LawLinkLK"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Text Block */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-200">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">About LawLinkLK</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            LawLink LK is revolutionizing the legal landscape in Sri Lanka by bridging the gap between clients and legal professionals. Designed for simplicity and efficiency, this cutting-edge platform empowers individuals and businesses to connect with experienced lawyers effortlessly. Whether you need legal advice, document assistance, or case management, LawLink LK provides a secure and seamless digital experience. With features like encrypted messaging, smart appointment scheduling, and real-time updates, we make legal support more accessible, transparent, and hassle-free. Justice should be within reach—LawLink LK brings it to your fingertips.              </p>
          </div>
        </div>

        {/* Vision, Mission, Values Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {/* Vision */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                <Globe className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Our Vision</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              A world where justice is seamless and accessible to all through technology.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                <Briefcase className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Our Mission</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Empowering legal connections with a platform built on trust and efficiency.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                <Shield className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Our Values</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Integrity and transparency at the core of every interaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;