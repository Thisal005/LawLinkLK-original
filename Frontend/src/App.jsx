import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import HowItWorks from "./pages/home/components/HowItWorks";
import NotFound from "./pages/NotFound";
import CookiePopup from "./components/CookiePopup";
import LoadingScreen from "./pages/loading/LoadingScreen";
import ClientCreateAcc from "./pages/auth/Registration/ClientCreateAcc";
import Clientlogin from "../src/pages/auth/ClientLogin/ClientLogin";
import VerifyEmail from "./pages/auth/ClientLogin/Verify-email";
import PasswordRest from "./pages/auth/ClientLogin/Password-Rest";
import EmailForResetPass from "./pages/auth/ClientLogin/EmailForResetPass";
import Newpassword from "./pages/auth/ClientLogin/Newpassword";
import LawyerCreateAcc from "./pages/auth/Registration/LawyerCreateAcc";
import LawyerVerifyEmail from "./pages/auth/LawyerLogin/Lawyer-verify-email";
import Lawyerlogin from "./pages/auth/LawyerLogin/LawyerLogin";
import LawyerEmailForResetPass from "./pages/auth/LawyerLogin/LawyerEmailForResetPass";
import LawyerNewpassword from "./pages/auth/LawyerLogin/LawyerNewpassword";
import { AppContentProvider } from "./context/AppContext"; // Ensure this path is correct
import { AuthContextProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthContextProvider>
      <AppContentProvider>
        <SocketProvider>
          <Router>
            {isLoading && <LoadingScreen />}
            {!isLoading && (
              <>
                <Routes>
                  {/* Home Page (Landing Page) */}
                  <Route path="/" element={<Home />} />

                  {/* Public Routes */}
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/create-account" element={<ClientCreateAcc />} />
                  <Route path="/login" element={<Clientlogin />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/password-rest" element={<PasswordRest />} />
                  <Route path="/email-for-password-reset" element={<EmailForResetPass />} />
                  <Route path="/create-new-password" element={<Newpassword />} />
                  <Route path="/lawyer-create-account" element={<LawyerCreateAcc />} />
                  <Route path="/lawyer-verify-email" element={<LawyerVerifyEmail />} />
                  <Route path="/lawyer-login" element={<Lawyerlogin />} />
                  <Route path="/lawyer-email-for-password-reset" element={<LawyerEmailForResetPass />} />
                  <Route path="/lawyer-create-new-password" element={<LawyerNewpassword />} />

                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <CookiePopup />
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </>
            )}
          </Router>
        </SocketProvider>
      </AppContentProvider>
    </AuthContextProvider>
  );
};

export default App;