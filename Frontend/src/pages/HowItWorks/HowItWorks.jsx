import React from "react";
import { Briefcase, User, Shield, Clock } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <User size={32} className="text-primary dark:text-darkPrimary" />,
      title: "Sign Up",
      description: "Create an account as a client or lawyer.",
    },
    {
      icon: <Briefcase size={32} className="text-primary dark:text-darkPrimary" />,
      title: "Find a Lawyer",
      description: "Search for lawyers based on your needs.",
    },
    {
      icon: <Shield size={32} className="text-primary dark:text-darkPrimary" />,
      title: "Secure Communication",
      description: "Communicate securely with your lawyer.",
    },
    {
      icon: <Clock size={32} className="text-primary dark:text-darkPrimary" />,
      title: "Get Help",
      description: "Schedule consultations and get legal advice.",
    },
  ];

  return (
    <section className="py-16 bg-background dark:bg-darkBackground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-darkPrimary mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary dark:text-darkPrimary mb-2">{step.title}</h3>
              <p className="text-textSecondary dark:text-darkTextSecondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;