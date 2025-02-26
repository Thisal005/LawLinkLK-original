import React from "react";
import { User, Search, MessageSquare, Shield, Folder, Bell, Users, Scale } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <User size={32} className="text-primary dark:text-darkPrimary" />,
      title: "Post Your Case",
      description: "Clients can post their legal cases anonymously.",
    },
    {
      icon: <Search size={32} className="text-primary dark:text-darkPrimary" />,
      title: "Find Relevant Cases",
      description: "Lawyers can view cases matching their expertise and location.",
    },
    {
      icon: <MessageSquare size={32} className="text-primary dark:text-darkPrimary" />,
      title: "Express Interest",
      description: "Lawyers can send a message to clients to take on the case.",
    },
    {
      icon: <Users size={32} className="text-primary dark:text-darkPrimary" />, // Alternative to Handshake
      title: "Mutual Agreement",
      description: "Both parties must agree to proceed. Profiles unlock after agreement.",
    },
    {
      icon: <Folder size={32} className="text-primary dark:text-darkPrimary" />,
      title: "Document Sharing",
      description: "Securely share case-related documents after agreement.",
    },
    {
      icon: <Bell size={32} className="text-primary dark:text-darkPrimary" />,
      title: "Case Updates",
      description: "Lawyers update case progress, and clients get notified.",
    },
    {
      icon: <Shield size={32} className="text-primary dark:text-darkPrimary" />,
      title: "Secure Communication",
      description: "All communication and documents are kept private and secure.",
    },
    {
      icon: <Scale size={32} className="text-primary dark:text-darkPrimary" />,
      title: "Ethical & Ad-Free",
      description: "No advertisements or unethical practices. We comply with all legal standards.",
    },
  ];

  return (
    <section id ="HowItWorks" className="py-16 bg-background dark:bg-darkBackground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-darkPrimary mb-12">
          How LawLinkLK Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary dark:text-darkPrimary mb-2">
                {step.title}
              </h3>
              <p className="text-textSecondary dark:text-darkTextSecondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
