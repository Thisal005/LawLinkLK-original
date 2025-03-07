import React from "react";
import { Briefcase, User, Shield, MessageSquare, Folder, Bell } from "lucide-react";
import clientImage from "../../../../src/assets/home/client.png"; // Client image with blue label
import lawyerImage from "../../../../src/assets/home/lawyer.png"; // Lawyer image with blue label

const Features = () => {
  const clientFeatures = [
    {
      icon: <User size={28} className="text-blue-600" />,
      title: "Post Your Case",
      description: "Share legal issues anonymously and connect with the perfect lawyer.",
    },
    {
      icon: <Bell size={28} className="text-blue-600" />,
      title: "Stay Updated",
      description: "Get real-time updates on your case and deadlines.",
    },
    {
      icon: <MessageSquare size={28} className="text-blue-600" />,
      title: "Secure Messaging",
      description: "Chat securely with lawyers via our encrypted system.",
    },
  ];

  const lawyerFeatures = [
    {
      icon: <Briefcase size={28} className="text-blue-600" />,
      title: "Find Relevant Cases",
      description: "Discover cases tailored to your expertise and region.",
    },
    {
      icon: <Folder size={28} className="text-blue-600" />,
      title: "Case Management",
      description: "Streamline documents and schedules effortlessly.",
    },
    {
      icon: <Shield size={28} className="text-blue-600" />,
      title: "Build Trust",
      description: "Highlight your skills and grow your reputation.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">
          Features
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Client Section */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Client Image */}
            <div className="relative w-full max-w-xs">
              <div className="w-64 h-64 rounded-full bg-blue-600 mx-auto overflow-hidden">
                <img
                  src={clientImage}
                  alt="Client"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Client Features */}
            <div className="space-y-6 w-full">
              {clientFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg flex items-center"
                >
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-600">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lawyer Section */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Lawyer Features */}
            <div className="space-y-6 w-full md:order-2">
              {lawyerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg flex items-center"
                >
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-600">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Lawyer Image */}
            <div className="relative w-full max-w-xs md:order-1">
              <div className="w-64 h-64 rounded-full bg-blue-600 mx-auto overflow-hidden">
                <img
                  src={lawyerImage}
                  alt="Lawyer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;