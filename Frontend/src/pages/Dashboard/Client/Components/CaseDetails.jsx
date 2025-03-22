// frontend/src/CaseDetails.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, ArrowLeft, Clock, User, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const CaseDetails = () => {
  const { backendUrl, userData } = useContext(AppContext);
  const { id } = useParams(); // Case ID from URL
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      if (!userData?._id) {
        toast.error("Please log in to view case details.");
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${backendUrl}/api/case/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && data.data) {
          setCaseData(data.data);
        } else {
          throw new Error("No case data found");
        }
      } catch (error) {
        console.error("Failed to fetch case details:", error);
        toast.error("Failed to load case details.");
        navigate("/client-dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [id, backendUrl, userData, navigate]);

  const handleDelete = async () => {
    setShowConfirm(false);
    try {
      const response = await axios.delete(`${backendUrl}/api/case/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success("Case deleted successfully!");
        navigate("/client-dashboard");
      } else {
        throw new Error(response.data.msg || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete case.");
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-screen items-center justify-center bg-gray-100"
      >
        <p className="text-gray-600 text-lg flex items-center gap-2">
          <Clock className="w-6 h-6 animate-spin text-blue-500" />
          Loading...
        </p>
      </motion.div>
    );
  }

  if (!caseData) return null;

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:ml-64 xl:ml-72">
        {/* Header */}
        <Header displayName={userData?.fullName || "Client"} practiceAreas="Client" />

        {/* Case Details Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-6 mt-16 overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                  <FileText className="w-8 h-8 text-blue-500" />
                  Case Details
                </h2>
                {caseData.status === "pending" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowConfirm(true)}
                    className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-md"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete Case
                  </motion.button>
                )}
              </div>

              {/* Case Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <label className="text-sm text-gray-500 font-medium">Subject</label>
                      <p className="text-gray-900 text-lg font-semibold">{caseData.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <label className="text-sm text-gray-500 font-medium">Description</label>
                      <p className="text-gray-700">{caseData.description || "N/A"}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className={`w-5 h-5 ${
                        caseData.status === "ongoing" ? "text-emerald-500" : "text-orange-500"
                      }`}
                    />
                    <div>
                      <label className="text-sm text-gray-500 font-medium">Status</label>
                      <p
                        className={`text-lg font-semibold capitalize ${
                          caseData.status === "ongoing" ? "text-emerald-600" : "text-orange-600"
                        }`}
                      >
                        {caseData.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <label className="text-sm text-gray-500 font-medium">Created At</label>
                      <p className="text-gray-700">
                        {new Date(caseData.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <label className="text-sm text-gray-500 font-medium">Assigned Lawyer</label>
                      <p className="text-gray-700">
                        {caseData.lawyerId?.fullName || "Not assigned"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Back Button */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/client-dashboard")}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Dashboard
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Confirmation Modal */}
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete <span className="font-semibold">"{caseData.subject}"</span>? This action is permanent.
                </p>
                <div className="flex gap-4 justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-md"
                  >
                    Yes, Delete
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowConfirm(false)}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors shadow-md"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CaseDetails;