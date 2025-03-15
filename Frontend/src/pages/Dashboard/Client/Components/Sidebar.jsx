import React, { useState, useEffect, useContext } from 'react';
import { Grid, FileText, MessageSquare, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import useFetchCase from '../../../../hooks/useFetchCase';
import { AppContext } from '../../../../context/AppContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, backendUrl } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userCase, setUserCase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCase = async () => {
      if (!userData?._id) {
        console.error("User ID not found in AppContext.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${backendUrl}/api/case/user/${userData._id}`, {
          credentials: 'include',
        });
        if (!response.ok) {
          const text = await response.text();
          console.error("Fetch error response:", text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const cases = await response.json();
        const singleCase = cases.length > 0 ? cases[0] : null;
        setUserCase(singleCase);
      } catch (error) {
        console.error("Failed to fetch user case:", error);
        setUserCase(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCase();
  }, [userData, backendUrl]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { path: "/client-dashboard", label: "Dashboard", icon: Grid },
    { path: "/post-case", label: "Post Case", icon: FileText },
    { path: "/chatbot", label: "Chatbot", icon: MessageSquare },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-600 to-blue-900 text-white flex-shrink-0 rounded-tr-3xl rounded-br-3xl z-40 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0 w-64 md:w-72' : '-translate-x-full w-0'
        } lg:translate-x-0 lg:w-64 xl:w-72`}
      >
        <div className="p-4 sm:p-6 h-full flex flex-col">
          {/* Logo Section */}
          <div className="flex items-center justify-between gap-2 mb-8 sm:mb-12">
            <div className="text-xl sm:text-2xl font-bold tracking-tight">
              <img
                onClick={() => {
                  navigate("/client-dashboard");
                  setIsSidebarOpen(false); // Close sidebar on mobile after click
                }}
                style={{ cursor: 'pointer' }}
                src="./images/hori.png"
                alt="Sidebar Logo"
                className="block w-auto h-8 sm:h-10"
              />
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-white focus:outline-none"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-3 sm:space-y-4 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <a
                  key={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
                  }}
                  aria-label={`Go to ${item.label}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-md border-l-4 border-white'
                      : 'text-white/90 hover:bg-blue-500/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Case Section (only if a case exists) */}
          {!loading && userCase && (
            <div className="mt-6 px-3 sm:px-4 py-4 bg-blue-700/10 rounded-lg">
              <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 text-white/70 uppercase tracking-wide">
                Your Case
              </h3>
              <div className="space-y-3">
                {(() => {
                  const { caseData, loading: caseLoading } = useFetchCase(userCase._id);
                  if (caseLoading) {
                    return <p className="text-white/70 text-sm">Loading case details...</p>;
                  }
                  if (!caseData) {
                    return <p className="text-white/70 text-sm">Case not found.</p>;
                  }
                  return (
                    <div
                      className="flex items-center gap-3 px-3 py-2 hover:bg-blue-700/50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => {
                        navigate(`/case/${userCase._id}`);
                        setIsSidebarOpen(false); // Close sidebar on mobile
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></div>
                      <span className="font-medium text-sm sm:text-base truncate">{caseData.caseName}</span>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Hamburger Menu Button for mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-2 bg-blue-600 text-white rounded-lg lg:hidden z-50 focus:outline-none shadow-md hover:bg-blue-700 transition-colors"
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
};

export default Sidebar;