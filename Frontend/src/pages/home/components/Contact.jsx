import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-16">
          Contact Us
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {/* Left Side: Contact Details */}
          <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-md border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200 mb-6">
              Contact Details
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">Email:</p>
                <p className="text-gray-600 dark:text-gray-300">support@lawlinklk.com</p>
              </div>
              <div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">Phone:</p>
                <p className="text-gray-600 dark:text-gray-300">+1 (123) 456-7890</p>
              </div>
              <div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">Address:</p>
                <p className="text-gray-600 dark:text-gray-300">123 Legal Street, Suite 456, Law City</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-md border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200 mb-6">
              Send Us a Message
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full p-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full p-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-1 block w-full p-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-600 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;