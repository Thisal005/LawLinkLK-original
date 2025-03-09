import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "../utills/cookies";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [lawyerData, setLawyerData] = useState(null);
  const [email, setEmail] = useState("");

  // Check login status on mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Check for user login
        try {
          const { data } = await axios.get(`${backendUrl}/api/user/data`, {
            withCredentials: true,
          });
          if (data.success) {
            setIsLoggedIn(true);
            setUserData(data.userData);
            return;
          }
        } catch (error) {
          // User not logged in, try lawyer
        }

        // Check for lawyer login
        try {
          const { data } = await axios.get(`${backendUrl}/api/lawyer-data/data`, {
            withCredentials: true,
          });
          if (data.success) {
            setIsLoggedIn(true);
            setLawyerData(data.UserData);
            return;
          }
        } catch (error) {
          // Lawyer not logged in
        }

        // No one is logged in
        setIsLoggedIn(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [backendUrl]);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
      });
      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true); // Ensure logged-in state is set
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data.");
    }
  };

  const getLawyerData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/lawyer-data/data`, {
        withCredentials: true,
      });
      if (data.success) {
        setLawyerData(data.UserData);
        setIsLoggedIn(true);
      } else {
        toast.error(data.message || "Failed to retrieve lawyer data.");
      }
    } catch (error) {
      console.error("Error fetching lawyer data:", error);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};