// frontend/src/pages/Dashboard/Client/Components/Header.jsx
import React, { useState, useContext, useRef, useEffect } from "react";
import { Calendar, HelpCircle, Bell, Settings, LogOut, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../../../context/AppContext";

const Header = ({ displayName: propDisplayName, practiceAreas = "Client" }) => {
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const { userData, lawyerData, backendUrl, setIsLoggedIn, setUserData } = useContext(AppContext);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const currentUser = userData || lawyerData;
  const displayName = propDisplayName || currentUser?.fullName || "Guest";
  const unreadNotifications = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser?._id || !/^[0-9a-fA-F]{24}$/.test(currentUser._id)) {
        console.warn("Skipping notifications fetch: Invalid or missing user ID", {
          userData,
          lawyerData,
        });
        setNotifications([]);
        return;
      }

      setLoadingNotifications(true);
      try {
        const endpoint = lawyerData
          ? `${backendUrl}/api/case/lawyer/notifications`
          : `${backendUrl}/api/case/user/notifications`;
        console.log("Fetching notifications:", { endpoint, userId: currentUser._id });
        const response = await axios.get(endpoint, { withCredentials: true });
        console.log("Notifications response:", response.data);
        if (response.data.success) {
          setNotifications(response.data.data || []);
        } else {
          setNotifications([]);
          console.warn("No notification data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error.response?.data || error.message);
        setNotifications([]);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          setIsLoggedIn(false);
          setUserData(null);
          navigate("/login");
        }
      } finally {
        setLoadingNotifications(false);
      }
    };

    if (currentUser?._id) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [currentUser, backendUrl, navigate, setIsLoggedIn, setUserData, lawyerData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsVisible(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNotifications = () => {
    setNotificationsVisible((prev) => !prev);
    if (userMenuVisible) setUserMenuVisible(false);
  };

  const toggleUserMenu = () => {
    setUserMenuVisible((prev) => !prev);
    if (notificationsVisible) setNotificationsVisible(false);
  };

  const handleLogout = async () => {
    try {
      const endpoint = lawyerData
        ? `${backendUrl}/api/lawyer/logout`
        : `${backendUrl}/api/auth/logout`;
      await axios.post(endpoint, {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUserData(null);
      navigate(lawyerData ? "/lawyer-login" : "/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.msg || "Logout failed. Please try again.");
    }
  };

  const markAllAsRead = async () => {
    try {
      const endpoint = lawyerData
        ? `${backendUrl}/api/case/lawyer/notifications/mark-all-read`
        : `${backendUrl}/api/case/user/notifications/mark-all-read`;
      await axios.post(endpoint, {}, { withCredentials: true });
      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Error marking notifications as read:", error.response?.data || error.message);
      toast.error("Failed to mark notifications as read");
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.metadata?.caseId) {
      navigate(`/case/${notification.metadata.caseId}`);
      setNotificationsVisible(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 xl:left-72 right-0 bg-gradient-to-r from-blue-700 to-blue-500 h-16 flex items-center justify-between px-4 sm:px-6 shadow-md z-30 rounded-bl-3xl rounded-br-none">
      <div className="flex items-center">
        <h1 className="text-lg sm:text-xl font-semibold text-white hidden lg:block">
          Legal Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="p-2 hover:bg-blue-600 rounded-full transition-colors duration-200 relative group"
            aria-label="Calendar"
            onClick={() => navigate("/calendar")}
          >
            <Calendar className="w-5 h-5 text-white" />
            <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Calendar
            </span>
          </button>
          <button
            className="p-2 hover:bg-blue-600 rounded-full transition-colors duration-200 relative group"
            aria-label="Your Cases"
            onClick={() => navigate("/cases")}
          >
            <FileText className="w-5 h-5 text-white" />
            <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Your Cases
            </span>
          </button>
          <button
            className="p-2 hover:bg-blue-600 rounded-full transition-colors duration-200 relative group"
            aria-label="Help"
            onClick={() => navigate("/help")}
          >
            <HelpCircle className="w-5 h-5 text-white" />
            <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Help
            </span>
          </button>
          <div className="relative" ref={notificationRef}>
            <button
              className={`p-2 ${notificationsVisible ? "bg-blue-600" : "hover:bg-blue-600"} rounded-full transition-colors duration-200 relative group`}
              onClick={toggleNotifications}
              aria-label={`Notifications - ${unreadNotifications} unread`}
              aria-expanded={notificationsVisible}
            >
              <Bell className="w-5 h-5 text-white" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
                  {unreadNotifications}
                </span>
              )}
              <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Notifications
              </span>
            </button>
            {notificationsVisible && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-hidden border border-gray-200">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-blue-50">
                  <h3 className="text-lg font-semibold text-blue-700">Notifications</h3>
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {loadingNotifications ? (
                    <div className="p-4 text-center text-gray-500">Loading...</div>
                  ) : notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? "bg-blue-50" : ""
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex justify-between items-start">
                          <p
                            className={`text-sm text-gray-800 ${
                              notification.unread ? "font-semibold" : ""
                            }`}
                          >
                            {notification.message}
                          </p>
                          {notification.unread && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No notifications</div>
                  )}
                </div>
                <div className="p-3 text-center bg-gray-50 border-t border-gray-100">
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => navigate("/notifications")}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative pl-3 border-l border-blue-400" ref={userMenuRef}>
          <button
            className="flex items-center gap-2 sm:gap-3 hover:bg-blue-600 rounded-full py-1 px-2 transition-colors duration-200"
            onClick={toggleUserMenu}
            aria-expanded={userMenuVisible}
            aria-label="User menu"
          >
            <div className="text-right hidden sm:block">
              <div className="font-medium text-white text-sm">{displayName}</div>
              <div className="text-xs text-blue-200">{practiceAreas}</div>
            </div>
            <div className="relative">
              <img
                src={currentUser?.profilePic || "./images/profilepic.jpg"}
                alt={`${displayName}'s profile`}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-200"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
          </button>
          {userMenuVisible && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
              <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-blue-50">
                <img
                  src={currentUser?.profilePic || "./images/profilepic.jpg"}
                  alt={`${displayName}'s profile`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-blue-700">{displayName}</p>
                  <p className="text-xs text-gray-600">{practiceAreas}</p>
                </div>
              </div>
              <div className="py-1">
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2 transition-colors"
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span>Account Settings</span>
                </button>
              </div>
              <div className="py-1 border-t border-gray-100">
                <button
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;