// frontend/src/pages/Dashboard/Lawyer/ViewCases.jsx
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ViewCaseCard from "./ViewCaseCard";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const ViewCases = () => {
  const { lawyerData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCases = async () => {
      if (!lawyerData?._id) {
        console.log("No lawyer ID found:", lawyerData);
        toast.error("Please log in as a lawyer to view cases.");
        navigate("/lawyer-login");
        return;
      }

      setLoading(true);
      try {
        console.log("Fetching cases from:", `${backendUrl}/api/case/all`);
        console.log("Lawyer ID:", lawyerData._id);
        console.log("Cookies sent:", document.cookie);

        const response = await axios.get(`${backendUrl}/api/case/all`, {
          withCredentials: true,
        });

        console.log("Full API Response:", response);
        console.log("Response Data:", response.data);

        if (response.data.success) {
          const caseData = response.data.data || [];
          console.log("Cases received:", caseData);
          setCases(caseData);
          if (caseData.length === 0) {
            console.log("No cases returned from API.");
            toast.info("No cases available at the moment.");
          }
        } else {
          console.error("API success false:", response.data.msg);
          toast.error(response.data.msg || "Failed to fetch cases.");
          setCases([]);
          if (response.data.msg === "Unauthorized") {
            navigate("/lawyer-login");
          }
        }
      } catch (error) {
        console.error("Error fetching cases:", {
          message: error.message,
          response: error.response
            ? { status: error.response.status, data: error.response.data }
            : "No response",
        });
        toast.error(error.response?.data?.msg || "Something went wrong fetching cases.");
        setCases([]);
        if (error.response?.status === 401) {
          console.log("Auth failure detected, redirecting to login");
          toast.error("Session expired. Please log in again.");
          navigate("/lawyer-login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllCases();
  }, [lawyerData, backendUrl, navigate]);

  const handleSendOffer = async (caseId) => {
    try {
      console.log("Sending offer for case:", caseId);
      const response = await axios.post(
        `${backendUrl}/api/case/offer/${caseId}`,
        {},
        { withCredentials: true }
      );
      console.log("Offer response:", response.data);
      if (response.data.success) {
        toast.success("Offer sent to the client!");
        setCases(cases.filter((c) => c._id !== caseId));
      } else {
        toast.error(response.data.msg || "Failed to send offer.");
      }
    } catch (error) {
      console.error("Error sending offer:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Failed to send offer.");
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/lawyer-login");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar activeTab="View Cases" />
      <div className="flex-1 flex flex-col lg:ml-64 xl:ml-72">
        <Header
          displayName={lawyerData?.fullName || "Lawyer"}
          practiceAreas={lawyerData?.practiceAreas || "Lawyer"}
        />
        <main className="flex-1 p-6 pt-20 lg:pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 flex flex-col items-center gap-4"
          >
            <button
              onClick={() => navigate("/lawyer-dashboard")}
              className="self-start flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <h2 className="text-4xl font-bold text-gray-800 tracking-tight">
              Available Anonymous Cases
            </h2>
            <p className="mt-2 text-gray-600 text-lg max-w-2xl">
              Discover unassigned cases posted anonymously by clients seeking legal expertise in your district and case type.
            </p>
          </motion.div>

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 text-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Loading cases...
              </span>
            </motion.div>
          ) : cases.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="max-w-5xl mx-auto grid gap-6"
            >
              {cases.map((caseItem) => (
                <motion.div
                  key={caseItem._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ViewCaseCard
                    title={caseItem.subject || "Untitled Case"}
                    description={caseItem.description || "No description provided."}
                    district={caseItem.district}
                    caseType={caseItem.caseType}
                    expanded={false}
                    onSendOffer={() => handleSendOffer(caseItem._id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 bg-white/80 backdrop-blur-md rounded-xl p-8 max-w-md mx-auto shadow-lg border border-gray-100"
            >
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4M4 13h4m4-9v16"
                />
              </svg>
              <p className="text-lg font-medium text-gray-700">No cases available</p>
              <p className="mt-2 text-sm text-gray-500">
                Check back later for new opportunities in your selected district and case type.
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ViewCases;