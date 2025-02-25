import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Client",
      comment: "LawLinkLK helped me find the perfect lawyer for my case. Highly recommended!",
    },
    {
      name: "Jane Smith",
      role: "Lawyer",
      comment: "This platform has helped me connect with clients and grow my practice.",
    },
    {
      name: "Alice Johnson",
      role: "Client",
      comment: "The process was seamless, and I got the help I needed quickly.",
    },
    {
      name: "Bob Brown",
      role: "Lawyer",
      comment: "Great platform for lawyers to showcase their expertise.",
    },
    {
      name: "Charlie Davis",
      role: "Client",
      comment: "I found a lawyer who understood my needs perfectly.",
    },
  ];

  return (
    <section className="py-16 bg-background dark:bg-darkBackground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-darkPrimary mb-12">
          Testimonials
        </h2>
        <div className="overflow-hidden relative">
          <div
            className="whitespace-nowrap"
            style={{
              display: "inline-block",
              animation: "scroll 20s linear infinite",
            }}
          >
            <div className="inline-flex space-x-8">
              {/* Render testimonials twice for seamless looping */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="inline-block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-72 h-64 flex-shrink-0 overflow-y-auto" // Fixed width and height with scroll
                >
                  <p className="text-textSecondary dark:text-darkTextSecondary mb-4 text-sm sm:text-base break-words whitespace-normal"> {/* Allow text to wrap */}
                    {testimonial.comment}
                  </p>
                  <p className="text-primary dark:text-darkPrimary font-semibold text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-textSecondary dark:text-darkTextSecondary text-sm sm:text-base">
                    {testimonial.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles for the animation */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Testimonials;