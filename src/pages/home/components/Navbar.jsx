import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Home, Info, Settings, HelpCircle, Phone, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../../assets/home/logo1.png"; // Logo image path

const Navbar = ({ isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hide Navbar if loading
  if (isLoading) return null;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white dark:bg-darkBackground shadow-lg rounded-lg mx-4 mt-4"
          : "bg-transparent"
      }`}
      style={{
        width: isScrolled ? "calc(100% - 2rem)" : "100%",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="LawLinkLK Logo" className="h-10 w-10" /> {/* Logo image */}
            <span
              className="text-2xl font-bold text-[#1a4b84] dark:text-[#5da9e9]"
              style={{
                WebkitTextStroke: "0.5px white", // White outline
                textShadow: "0 0 5px white", // Optional: Adds a glow effect
              }}
            >
              LawLinkLK
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("about")} className="text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent transition duration-300">
              About
            </button>
            <button onClick={() => scrollToSection("features")} className="text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent transition duration-300">
              Features
            </button>
            <Link to="/how-it-works" className="text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent transition duration-300">
              How It Works
            </Link>
            <button onClick={() => scrollToSection("pricing")} className="text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent transition duration-300">
              Pricing
            </button>
            <button onClick={() => scrollToSection("faq")} className="text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent transition duration-300">
              FAQ
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent transition duration-300">
              Contact
            </button>
            <div className="flex space-x-4">
              <Link
                to="/auth/client-login"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent hover:text-white transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent hover:text-white transition duration-300"
              >
                Register
              </Link>
            </div>
            {/* Dark Mode Toggle Button (Desktop) */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button and Dark Mode Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Dark Mode Toggle Button (Mobile) */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleMenu} className="text-textPrimary dark:text-darkTextPrimary focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={toggleMenu}>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg mx-4 mt-16 p-6 transform transition-all duration-300">
              <div className="space-y-4">
                <button
                  onClick={() => {
                    scrollToSection("about");
                    toggleMenu();
                  }}
                  className="flex items-center space-x-3 text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent"
                >
                  <Info size={20} />
                  <span>About</span>
                </button>
                <button
                  onClick={() => {
                    scrollToSection("features");
                    toggleMenu();
                  }}
                  className="flex items-center space-x-3 text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent"
                >
                  <Settings size={20} />
                  <span>Features</span>
                </button>
                <Link
                  to="/how-it-works"
                  className="flex items-center space-x-3 text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent"
                >
                  <Home size={20} />
                  <span>How It Works</span>
                </Link>
                <button
                  onClick={() => {
                    scrollToSection("pricing");
                    toggleMenu();
                  }}
                  className="flex items-center space-x-3 text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent"
                >
                  <HelpCircle size={20} />
                  <span>Pricing</span>
                </button>
                <button
                  onClick={() => {
                    scrollToSection("faq");
                    toggleMenu();
                  }}
                  className="flex items-center space-x-3 text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent"
                >
                  <HelpCircle size={20} />
                  <span>FAQ</span>
                </button>
                <button
                  onClick={() => {
                    scrollToSection("contact");
                    toggleMenu();
                  }}
                  className="flex items-center space-x-3 text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent"
                >
                  <Phone size={20} />
                  <span>Contact</span>
                </button>
                <Link
                  to="/auth/client-login"
                  className="flex items-center space-x-3 text-textPrimary dark:text-darkTextPrimary hover:text-primary dark:hover:text-darkAccent"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/auth/register"
                  className="flex items-center space-x-3 text-primary dark:text-darkAccent"
                >
                  <UserPlus size={20} />
                  <span>Register</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;