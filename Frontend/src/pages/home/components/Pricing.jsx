import React from "react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      features: ["Find Lawyers", "Secure Messaging", "Limited Consultations"],
    },
    {
      name: "Premium",
      price: "$49/month",
      features: ["Unlimited Consultations", "Priority Support", "Advanced Search"],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-20">
          Pricing
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-md border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200 mb-4">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-6">
                {plan.price}
              </p>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-gray-600 dark:text-gray-300 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;