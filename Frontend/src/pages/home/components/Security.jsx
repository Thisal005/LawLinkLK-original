import React, { useEffect, useRef } from "react";

// Import your PNG logos
import gdprLogo from "../../../../src/assets/home/gdpr.png"; // Your actual path
import sslLogo from "../../../../src/assets/home/ssl.png"; // Your actual path

const Security = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const securityCardRefs = useRef([]);
  const circleRef = useRef(null);

  // Reset refs array
  securityCardRefs.current = [];

  useEffect(() => {
    // Intersection Observer for entrance animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [
      sectionRef.current,
      titleRef.current,
      descriptionRef.current,
      circleRef.current,
      ...securityCardRefs.current,
    ].filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addToSecurityRefs = (el) => {
    if (el && !securityCardRefs.current.includes(el)) {
      securityCardRefs.current.push(el);
    }
  };

  return (
    <section
      id="security"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-[#0A0E26] to-[#1A2A44] text-white relative overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-out"
    >
      {/* Subtle particle background (optional, use a library like tsparticles) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particles"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative">
          {/* Rotating circular background */}
          <div
            ref={circleRef}
            className="absolute w-full h-full max-w-6xl max-h-6xl rounded-full bg-gray-800/20 border border-gray-700/30 shadow-lg transform rotate-0 animate-rotate opacity-0 transition-all duration-1000 delay-200"
          ></div>

          <div className="text-center relative z-20 pt-12">
            <h2
              ref={titleRef}
              className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#4B5EAA] mb-8 opacity-0 translate-y-8 transition-all duration-1000 delay-300 animate-typewriter"
            >
              End-to-End Security &<br />Data Protection
            </h2>

            <p
              ref={descriptionRef}
              className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed opacity-0 translate-y-6 transition-all duration-1000 delay-400"
            >
              We prioritize your privacy and ensure that all sensitive legal communications remain confidential. Our platform is designed with end-to-end encryption and secure authentication, making sure your data stays in your control—always.
            </p>
          </div>

          <div className="relative py-32 mt-12">
            {/* Central logos with pulsing effect */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="relative w-32 h-32">
                <img
                  src={gdprLogo}
                  alt="GDPR Compliance"
                  className="w-24 h-24 absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-40"
                />
                <img
                  src={sslLogo}
                  alt="SSL Security"
                  className="w-18 h-18 absolute left-1/2 top-2/3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-40 delay-500"
                />
              </div>
            </div>

            {/* Security cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 relative z-20 max-w-5xl mx-auto">
              {/* Top Left Card */}
              <div
                ref={(el) => addToSecurityRefs(el)}
                className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 opacity-0 translate-y-6 delay-500"
              >
                <h3 className="text-[#00A3FF] text-xl font-semibold mb-2">End-to-End Encryption</h3>
                <p className="text-gray-300 text-sm leading-snug">
                  All messages, files, and interactions are encrypted for maximum security.
                </p>
                <button className="mt-4 text-[#4B5EAA] hover:text-[#00A3FF] text-sm font-medium transition-colors duration-300">
                  Learn More
                </button>
              </div>

              {/* Top Right Card */}
              <div
                ref={(el) => addToSecurityRefs(el)}
                className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 opacity-0 translate-y-6 delay-600"
              >
                <h3 className="text-[#00A3FF] text-xl font-semibold mb-2">Regulatory Compliance</h3>
                <p className="text-gray-300 text-sm leading-snug">
                  Compliant with GDPR and PCI DSS security standards.
                </p>
                <button className="mt-4 text-[#4B5EAA] hover:text-[#00A3FF] text-sm font-medium transition-colors duration-300">
                  Learn More
                </button>
              </div>

              {/* Bottom Left Card */}
              <div
                ref={(el) => addToSecurityRefs(el)}
                className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 opacity-0 translate-y-6 delay-700"
              >
                <h3 className="text-[#00A3FF] text-xl font-semibold mb-2">Secure Authentication</h3>
                <p className="text-gray-300 text-sm leading-snug">
                  Multi-factor authentication (MFA) ensures only authorized users access their accounts.
                </p>
                <button className="mt-4 text-[#4B5EAA] hover:text-[#00A3FF] text-sm font-medium transition-colors duration-300">
                  Learn More
                </button>
              </div>

              {/* Bottom Right Card */}
              <div
                ref={(el) => addToSecurityRefs(el)}
                className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 opacity-0 translate-y-6 delay-800"
              >
                <h3 className="text-[#00A3FF] text-xl font-semibold mb-2">Private API Access</h3>
                <p className="text-gray-300 text-sm leading-snug">
                  Our API ensures that even we don't have access to your confidential legal data.
                </p>
                <button className="mt-4 text-[#4B5EAA] hover:text-[#00A3FF] text-sm font-medium transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation and styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

            body {
              font-family: 'Inter', sans-serif;
            }

            .animate-in {
              opacity: 1 !important;
              transform: translateY(0) !important;
            }

            .animate-rotate {
              animation: rotate 20s linear infinite;
            }

            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            .animate-pulse {
              animation: pulse 2s infinite ease-in-out;
            }

            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 0.4; }
              50% { transform: scale(1.05); opacity: 0.6; }
            }

            .animate-typewriter {
              animation: typewriter 2s steps(40, end) forwards, blink 0.75s step-end infinite;
              overflow: hidden;
              white-space: nowrap;
              border-right: 2px solid #00A3FF;
              width: 0;
            }

            @keyframes typewriter {
              to { width: 100%; }
            }

            @keyframes blink {
              50% { border-color: transparent; }
            }
          `,
        }}
      />
    </section>
  );
};

export default Security;