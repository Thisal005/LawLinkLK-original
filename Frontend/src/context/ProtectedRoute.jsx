import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // Ensure this path is correct

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, userData, getUserData } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    // Fetch user data if logged in but userData is missing
    if (isLoggedIn && !userData) {
      getUserData();
    }
  }, [isLoggedIn, userData, getUserData]);

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;