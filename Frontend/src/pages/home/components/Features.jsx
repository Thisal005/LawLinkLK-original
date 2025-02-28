import React from "react";
import { Briefcase, User, Shield, MessageSquare, Folder, Bell } from "lucide-react";

const Features = () => {
  const clientFeatures = [
    {
      icon: <User size={32} className="text-[#1a4b84] dark:text-[#5da9e9]" />,
      title: "Post Your Case",
      description: "Share your legal issues anonymously and get matched with the right lawyer.",
    },
    {
      icon: <MessageSquare size={32} className="text-[#1a4b84] dark:text-[#5da9e9]" />,
      title: "Secure Messaging",
      description: "Communicate securely with lawyers through our encrypted messaging system.",
    },
    {
      icon: <Bell size={32} className="text-[#1a4b84] dark:text-[#5da9e9]" />,
      title: "Stay Updated",
      description: "Receive real-time updates on your case progress and important deadlines.",
    },
  ];

  const lawyerFeatures = [
    {
      icon: <Briefcase size={32} className="text-[#1a4b84] dark:text-[#5da9e9]" />,
      title: "Find Relevant Cases",
      description: "Access cases that match your expertise and location.",
    },
    {
      icon: <Folder size={32} className="text-[#1a4b84] dark:text-[#5da9e9]" />,
      title: "Case Management",
      description: "Organize case documents and schedules efficiently.",
    },
    {
      icon: <Shield size={32} className="text-[#1a4b84] dark:text-[#5da9e9]" />,
      title: "Build Trust",
      description: "Showcase your expertise and build a strong professional reputation.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#1a4b84] dark:text-[#5da9e9] mb-12">
          Features
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Client Features */}
          <div>
            <h3 className="text-2xl font-semibold text-[#1a4b84] dark:text-[#5da9e9] mb-6">
              For Clients
            </h3>
            <div className="space-y-6">
              {clientFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition duration-300"
                >
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold text-[#1a4b84] dark:text-[#5da9e9]">
                      {feature.title}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-200">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lawyer Features */}
          <div>
            <h3 className="text-2xl font-semibold text-[#1a4b84] dark:text-[#5da9e9] mb-6">
              For Lawyers
            </h3>
            <div className="space-y-6">
              {lawyerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition duration-300"
                >
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold text-[#1a4b84] dark:text-[#5da9e9]">
                      {feature.title}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-200">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;