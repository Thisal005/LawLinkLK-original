import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "../utills/cookies";

export const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'; // Fallback for dev
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // Client data
  const [lawyerData, setLawyerData] = useState(null); // Lawyer data
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true); // Track initial auth check

  // Check login status on mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Check for user (client) login
        try {
          const { data } = await axios.get(`${backendUrl}/api/user/data`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${getCookie("jwt")}` },
          });
          if (data.success) {
            setIsLoggedIn(true);
            setUserData(data.userData);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.log("No client logged in:", error.message);
        }

        // Check for lawyer login
        try {
          const { data } = await axios.get(`${backendUrl}/api/lawyer-data/data`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${getCookie("jwt")}` },
          });
          if (data.success) {
            setIsLoggedIn(true);
            setLawyerData(data.UserData);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.log("No lawyer logged in:", error.message);
        }

        // No one is logged in
        setIsLoggedIn(false);
        setUserData(null);
        setLawyerData(null);
      } catch (error) {
        console.error("Auth check failed:", error.message);
        setIsLoggedIn(false);
        setUserData(null);
        setLawyerData(null);
      } finally {
        setLoading(false); // Ensure loading ends
      }
    };

    checkLoginStatus();
  }, [backendUrl]);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${getCookie("jwt")}` },
      });
      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
      } else {
        toast.error(data.message || "Failed to retrieve user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      toast.error("Error fetching user data.");
    }
  };

  const getLawyerData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/lawyer-data/data`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${getCookie("jwt")}` },
      });
      if (data.success) {
        setLawyerData(data.UserData);
        setIsLoggedIn(true);
      } else {
        toast.error(data.message || "Failed to retrieve lawyer data.");
      }
    } catch (error) {
      console.error("Error fetching lawyer data:", error.message);
      toast.error("Error fetching lawyer data.");
    }
  };

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    lawyerData,
    setLawyerData,
    getUserData,
    getLawyerData,
    email,
    setEmail,
    loading, // Expose loading state
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};