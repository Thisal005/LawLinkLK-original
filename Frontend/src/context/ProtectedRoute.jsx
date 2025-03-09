import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"; // Use AuthContext

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, userData, getUserData } = useAuthContext();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn && !userData) {
      console.log("ProtectedRoute: Fetching user data...");
      getUserData()
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Failed to fetch user data in ProtectedRoute:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, userData, getUserData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    console.log("ProtectedRoute: Not logged in, redirecting to /login from", location.pathname);
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;