import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  Trash2, 
  ArrowLeft, 
  Clock, 
  User, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Briefcase,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";

const CaseDetails = () => {
  const { backendUrl, userData } = useContext(AppContext);
  const { id } = useParams();
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
          method: "GET", // Explicitly set method
          credentials: "include",
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
      const response = await axios({
        method: "DELETE",
        url: `${backendUrl}/api/case/${id}`,
        withCredentials: true, // Ensures cookies (e.g., auth token) are sent
      });

      if (response.data.success) {
        toast.success("Case deleted successfully!");
        navigate("/client-dashboard");
      } else {
        throw new Error(response.data.msg || "Failed to delete case");
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Failed to delete case.");
    }
  };

  const canDeleteCase = () => {
    return caseData?.status === "pending" && !caseData?.lawyerId;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg font-medium flex items-center gap-2">
          <Clock className="w-6 h-6 animate-spin text-indigo-600" />
          Loading...
        </p>
      </div>
    );
  }

  if (!caseData) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 xl:ml-72">
        <Header displayName={userData?.fullName || "Client"} practiceAreas="Client" />
        <div className="flex-1 p-6 mt-16 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Case Details
                </h2>
                {canDeleteCase() && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Case
                  </motion.button>
                )}
              </div>

              {/* Case Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Subject</label>
                      <p className="text-gray-900 text-base font-semibold">{caseData.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <p className="text-gray-700 text-sm">{caseData.description || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Case Type</label>
                      <p className="text-gray-700 text-sm">
                        {caseData.caseType || "General"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className={`w-5 h-5 ${
                        caseData.status === "ongoing" ? "text-green-600" : "text-yellow-600"
                      }`}
                    />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <p
                        className={`text-base font-semibold capitalize ${
                          caseData.status === "ongoing" ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {caseData.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Created At</label>
                      <p className="text-gray-700 text-sm">
                        {new Date(caseData.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Updated</label>
                      <p className="text-gray-700 text-sm">
                        {caseData.updatedAt
                          ? new Date(caseData.updatedAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Not updated yet"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-indigo-600" />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Assigned Lawyer</label>
                      <p className="text-gray-700 text-sm">
                        {caseData.lawyerId?.fullName || "Awaiting Assignment"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/client-dashboard")}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </motion.button>
              </div>
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
                className="bg-white rounded-lg p-6 max-w-md w-full shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-gray-800">"{caseData.subject}"</span>? 
                  This action can only be performed before a lawyer accepts the case and cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;