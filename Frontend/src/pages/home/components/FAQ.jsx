import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I post a case on LawLinkLK?",
      answer: "You can post your case anonymously by filling out a simple form. Provide details about your legal issue, and lawyers in your area will be able to view it.",
    },
    {
      question: "Is LawLinkLK free to use?",
      answer: "Yes, LawLinkLK is completely free for clients to post cases and for lawyers to browse cases. There are no hidden fees.",
    },
    {
      question: "How do lawyers express interest in my case?",
      answer: "Lawyers who are interested in your case will send you a message through the platform. You can discuss your case details and decide if you want to proceed. Only after both parties agree to work together will the lawyer’s profile be unlocked for you.",
    },
    {
      question: "Is my information secure on LawLinkLK?",
      answer: "Yes, we use advanced encryption and security measures to protect your data. Your information is only shared with lawyers after you agree to work with them.",
    },
    {
      question: "Can I share documents with my lawyer?",
      answer: "Yes, once you agree to work with a lawyer, you can securely share documents and communicate through the platform.",
    },
    {
      question: "How do I stay updated on my case?",
      answer: "Your lawyer will provide regular updates on your case through the platform. You’ll also receive notifications about important deadlines and milestones.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#1a4b84] dark:text-[#5da9e9] mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center"
              >
                <h3 className="text-xl font-semibold text-[#1a4b84] dark:text-[#5da9e9] text-left">
                  {faq.question}
                </h3>
                {activeIndex === index ? (
                  <ChevronUp size={24} className="text-[#1a4b84] dark:text-[#5da9e9]" />
                ) : (
                  <ChevronDown size={24} className="text-[#1a4b84] dark:text-[#5da9e9]" />
                )}
              </button>
              {activeIndex === index && (
                <p className="mt-4 text-gray-700 dark:text-gray-200">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;