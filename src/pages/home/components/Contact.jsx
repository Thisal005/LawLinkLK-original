import React from "react";

const Contact = () => {
  return (
    <section id="contact" section className="py-16 bg-background dark:bg-darkBackground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-darkPrimary mb-12">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side: Contact Details */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-primary dark:text-darkPrimary mb-4">Contact Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-textPrimary dark:text-darkTextPrimary font-semibold">Email:</p>
                <p className="text-textSecondary dark:text-darkTextSecondary">support@lawlinklk.com</p>
              </div>
              <div>
                <p className="text-textPrimary dark:text-darkTextPrimary font-semibold">Phone:</p>
                <p className="text-textSecondary dark:text-darkTextSecondary">+1 (123) 456-7890</p>
              </div>
              <div>
                <p className="text-textPrimary dark:text-darkTextPrimary font-semibold">Address:</p>
                <p className="text-textSecondary dark:text-darkTextSecondary">123 Legal Street, Suite 456, Law City</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-primary dark:text-darkPrimary mb-4">Send Us a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-textPrimary dark:text-darkTextPrimary">
                  Name
                </label>
                <input type="text" id="name" className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-textPrimary dark:text-darkTextPrimary">
                  Email
                </label>
                <input type="email" id="email" className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-textPrimary dark:text-darkTextPrimary">
                  Message
                </label>
                <textarea id="message" rows="4" className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"></textarea>
              </div>
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-accent transition duration-300">
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