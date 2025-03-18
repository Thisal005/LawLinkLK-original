// frontend/src/pages/Dashboard/Lawyer/Components/Sidebar.jsx
import React, { useState, useEffect, useContext } from "react";
import { Grid, Eye, MessageSquare, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";

const Sidebar = ({ activeTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lawyerData, backendUrl } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      if (!lawyerData?._id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${backendUrl}/api/case/user/${lawyerData._id}`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setCases(data.data || []);
        } else {
          setCases([]);
        }
      } catch (error) {
        console.error("Failed to fetch lawyer cases:", error);
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [lawyerData, backendUrl]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { path: "/lawyer-dashboard", label: "Dashboard", icon: Grid },
    { path: "/view-cases", label: "View Cases", icon: Eye },
    { path: "/chatbot", label: "Chatbot", icon: MessageSquare },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-600 to-blue-900 text-white flex-shrink-0 rounded-tr-3xl rounded-br-3xl z-40 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0 w-64 md:w-72" : "-translate-x-full w-0"
        } lg:translate-x-0 lg:w-64 xl:w-72`}
      >
        <div className="p-4 sm:p-6 h-full flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-8 sm:mb-12">
            <div className="text-xl sm:text-2xl font-bold tracking-tight">
              <img
                onClick={() => {
                  navigate("/lawyer-dashboard");
                  setIsSidebarOpen(false);
                }}
                style={{ cursor: "pointer" }}
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
          <nav className="space-y-3 sm:space-y-4 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || activeTab === item.label;

              return (
                <a
                  key={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }}
                  aria-label={`Go to ${item.label}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md border-l-4 border-white"
                      : "text-white/90 hover:bg-blue-500/50 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </a>
              );
            })}
          </nav>
          {!loading && cases.length > 0 && (
            <div className="mt-6 px-3 sm:px-4 py-4 bg-blue-700/10 rounded-lg">
              <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 text-white/70 uppercase tracking-wide">
                Active Cases
              </h3>
              <div className="space-y-3">
                {cases.slice(0, 3).map((caseItem) => (
                  <div
                    key={caseItem._id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-blue-700/50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => {
                      navigate(`/lawyer-case/${caseItem._id}`);
                      setIsSidebarOpen(false);
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></div>
                    <span className="font-medium text-sm sm:text-base truncate">
                      {caseItem.subject}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
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