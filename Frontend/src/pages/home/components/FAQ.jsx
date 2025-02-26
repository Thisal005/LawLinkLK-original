import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const faqs = [
    { question: "How do I find a lawyer?", answer: "You can search for lawyers by specialty, location, or ratings on our platform." },
    { question: "Is LawLinkLK free to use?", answer: "Yes, signing up and searching for lawyers is completely free." },
    { question: "How do I contact a lawyer?", answer: "Once you find a lawyer, you can send them a message or schedule a consultation." },
    { question: "Is my information secure?", answer: "Yes, we use advanced encryption to protect your data." },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#1a4b84] dark:text-[#5da9e9] mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center">
                <h3 className="text-xl font-semibold text-[#1a4b84] dark:text-[#5da9e9]">{faq.question}</h3>
                {activeIndex === index ? <ChevronUp size={24} className="text-[#1a4b84] dark:text-[#5da9e9]" /> : <ChevronDown size={24} className="text-[#1a4b84] dark:text-[#5da9e9]" />}
              </button>
              {activeIndex === index && <p className="mt-4 text-gray-700 dark:text-gray-200">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;