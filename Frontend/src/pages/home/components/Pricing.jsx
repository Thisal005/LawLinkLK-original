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
    <section id="pricing" section className="py-16 bg-background dark:bg-darkBackground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-darkPrimary mb-12">Pricing</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary dark:text-darkPrimary mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold text-primary dark:text-darkPrimary mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-textSecondary dark:text-darkTextSecondary">{feature}</li>
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