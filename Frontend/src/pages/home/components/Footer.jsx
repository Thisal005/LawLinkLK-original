import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-darkBackground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">LawLinkLK</h3>
          <p className="text-gray-400 dark:text-darkTextSecondary">
            Connecting clients with legal professionals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#about" className="text-gray-400 dark:text-darkTextSecondary hover:text-white">About</a></li>
            <li><a href="#features" className="text-gray-400 dark:text-darkTextSecondary hover:text-white">Features</a></li>
            <li><a href="#how-it-works" className="text-gray-400 dark:text-darkTextSecondary hover:text-white">How It Works</a></li>
            <li><a href="#pricing" className="text-gray-400 dark:text-darkTextSecondary hover:text-white">Pricing</a></li>
            <li><a href="#faq" className="text-gray-400 dark:text-darkTextSecondary hover:text-white">FAQ</a></li>
            <li><a href="#contact" className="text-gray-400 dark:text-darkTextSecondary hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="/privacy" className="text-gray-400 dark:text-darkTextSecondary hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="text-gray-400 dark:text-darkTextSecondary hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 dark:text-darkTextSecondary hover:text-white"><Facebook size={24} /></a>
            <a href="#" className="text-gray-400 dark:text-darkTextSecondary hover:text-white"><Twitter size={24} /></a>
            <a href="#" className="text-gray-400 dark:text-darkTextSecondary hover:text-white"><Linkedin size={24} /></a>
            <a href="#" className="text-gray-400 dark:text-darkTextSecondary hover:text-white"><Instagram size={24} /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-8">
        <p className="text-gray-400 dark:text-darkTextSecondary">&copy; 2023 LawLinkLK. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;