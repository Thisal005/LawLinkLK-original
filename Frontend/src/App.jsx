// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContentProvider } from "./context/AppContext";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Home from "./pages/home/Home";
import HowItWorks from "./pages/home/components/HowItWorks";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./pages/loading/LoadingScreen";
import ClientCreateAcc from "./pages/auth/Registration/ClientCreateAcc";
import ClientLogin from "./pages/auth/ClientLogin/ClientLogin";
import ClientDashboard from "./pages/Dashboard/Client/ClientDashboard";
import VerifyEmail from "./pages/auth/ClientLogin/Verify-email";
import PasswordRest from "./pages/auth/ClientLogin/Password-Rest";
import EmailForResetPass from "./pages/auth/ClientLogin/EmailForResetPass";
import Newpassword from "./pages/auth/ClientLogin/Newpassword";
import LawyerCreateAcc from "./pages/auth/Registration/LawyerCreateAcc";
import LawyerVerifyEmail from "./pages/auth/LawyerLogin/Lawyer-verify-email";
import LawyerLogin from "./pages/auth/LawyerLogin/LawyerLogin";
import Notifications from "./pages/Dashboard/Notifications";
import PostCase from "./pages/Dashboard/Client/Components/CreatePostForm";
import LawyerEmailForResetPass from "./pages/auth/LawyerLogin/LawyerEmailForResetPass";
import LawyerNewpassword from "./pages/auth/LawyerLogin/LawyerNewpassword";
import Chat from "./pages/Dashboard/Chat";
import CaseDetails from "./pages/Dashboard/Client/Components/CaseDetails";
import AccountSettings from "./pages/Dashboard/Client/Components/AccountSettings";
import CaseHistory from "./pages/Dashboard/Client/Components/CaseHistory";
import Chatbot from "./pages/Dashboard/Client/Components/Chatbot";
import LawyerDashboard from "./pages/Dashboard/Lawyer/LawyerDashboard";
import LawyerAccountSettings from "./pages/Dashboard/Lawyer/Components/LawyerAccountSettings";
import LawyerCase from "./pages/Dashboard/Lawyer/Components/Case";
import ViewCases from "./pages/Dashboard/Lawyer/Components/ViewCases";
import CalendarReminders from "./pages/Dashboard/Lawyer/Components/CalendarReminders";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    console.log("App: Mounting...");
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      console.log("App: Unmounting...");
      clearTimeout(timer);
    };
  }, []);

  return (
    <AppContentProvider>
      <AuthContextProvider>
        <SocketProvider>
          <Router>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/create-account" element={<ClientCreateAcc />} />
                  <Route path="/login" element={<ClientLogin />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/password-rest" element={<PasswordRest />} />
                  <Route
                    path="/email-for-password-reset"
                    element={<EmailForResetPass />}
                  />
                  <Route path="/create-new-password" element={<Newpassword />} />
                  <Route path="/lawyer-create-account" element={<LawyerCreateAcc />} />
                  <Route path="/lawyer-verify-email" element={<LawyerVerifyEmail />} />
                  <Route path="/lawyer-login" element={<LawyerLogin />} />
                  <Route
                    path="/lawyer-email-for-password-reset"
                    element={<LawyerEmailForResetPass />}
                  />
                  <Route
                    path="/lawyer-create-new-password"
                    element={<LawyerNewpassword />}
                  />

                  {/* Protected Routes */}
                  <Route
                    path="/client-dashboard"
                    element={
                      <ProtectedRoute>
                        <ClientDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/post-case"
                    element={
                      <ProtectedRoute>
                        <PostCase />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/case/:id"
                    element={
                      <ProtectedRoute>
                        <CaseDetails />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <AccountSettings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/lawyer-settings"
                    element={
                      <ProtectedRoute>
                        <LawyerAccountSettings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/case-history"
                    element={
                      <ProtectedRoute>
                        <CaseHistory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notifications"
                    element={
                      <ProtectedRoute>
                        <Notifications />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/chat"
                    element={
                      <ProtectedRoute>
                        <Chat />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/chatbot"
                    element={
                      <ProtectedRoute>
                        <Chatbot />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/lawyer-dashboard"
                    element={
                      <ProtectedRoute>
                        <LawyerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/lawyer-settings"
                    element={
                      <ProtectedRoute>
                        <LawyerAccountSettings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/lawyer-case/:caseId"
                    element={
                      <ProtectedRoute>
                        <LawyerCase />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/view-cases"
                    element={
                      <ProtectedRoute>
                        <ViewCases />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/calendar"
                    element={
                      <ProtectedRoute>
                        <CalendarReminders onClose={() => navigate(-1)} />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch-all Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
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
      </AuthContextProvider>
    </AppContentProvider>
  );
};

export default App;