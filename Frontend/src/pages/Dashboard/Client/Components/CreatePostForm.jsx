import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { 
  FileText, 
  Briefcase, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Send, 
  Sparkles 
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function PostCaseForm() {
  const { userData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    caseType: "",
    district: "",
    courtDate: "",
    description: "",
    clientId: userData?._id || "",
  });
  const [noCourtDate, setNoCourtDate] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [pendingCasesCount, setPendingCasesCount] = useState(0);

  useEffect(() => {
    const fetchPendingCases = async () => {
      if (!userData?._id) return;
      try {
        const response = await fetch(`${backendUrl}/api/case/pending-count/${userData._id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setPendingCasesCount(data.count);
        } else {
          console.error("Error fetching pending cases:", data.msg);
        }
      } catch (err) {
        console.error("Error fetching pending cases:", err);
      }
    };
    fetchPendingCases();
  }, [userData, backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?._id) {
      setError("You must be logged in to create a case.");
      toast.error("Please log in to post a case.");
      return;
    }
    if (!agreed) {
      setError("You must agree to post this case anonymously.");
      toast.error("Please agree to the anonymity terms.");
      return;
    }
    if (pendingCasesCount >= 3) {
      setError("You’ve reached your limit of 3 pending cases!");
      toast.error("You’ve reached your limit of 3 pending cases!");
      return;
    }

    setLoading(true);
    setError(null);

    const finalFormData = {
      ...formData,
      courtDate: noCourtDate ? "" : formData.courtDate,
    };

    try {
      const response = await fetch(`${backendUrl}/api/case/create-case`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(finalFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to create case");
      }

      await response.json();
      toast.success("Your case is now live!");
      setPendingCasesCount((prev) => prev + 1);
      navigate("/client-dashboard");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 xl:ml-72">
        <Header displayName={userData?.fullName || "Client"} practiceAreas="Client" />
        <main className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10 pt-20 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-4xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50 relative overflow-hidden"
          >
            {/* Decorative Sparkles */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 text-indigo-200"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-full h-full opacity-30" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-800 text-center mb-6 flex items-center justify-center gap-3 tracking-tight">
              <Briefcase className="w-9 h-9 text-indigo-500 animate-[pulse_2s_infinite]" />
              Post a Case Anonymously
            </h2>
            <p className="text-base text-gray-600 text-center mb-8 tracking-wide">
              Share your legal matter discreetly—avoid sensitive or personal details.
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <AlertCircle className="w-6 h-6" />
                {error}
              </motion.div>
            )}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <Clock className="w-6 h-6 animate-spin" />
                Submitting your case...
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                  <FileText className="w-6 h-6" /> Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Property Dispute"
                  className="w-full p-4 border border-indigo-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm text-gray-800 placeholder-gray-500 text-lg"
                  disabled={loading}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                    <Briefcase className="w-6 h-6" /> Case Type
                  </label>
                  <select
                    name="caseType"
                    value={formData.caseType}
                    onChange={handleChange}
                    className="w-full p-4 border border-indigo-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm text-gray-800 text-lg"
                    disabled={loading}
                    required
                  >
                    <option value="">Select case type</option>
                    <option value="criminal">Criminal</option>
                    <option value="civil">Civil</option>
                    <option value="family">Family</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                    <MapPin className="w-6 h-6" /> District
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full p-4 border border-indigo-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm text-gray-800 text-lg"
                    disabled={loading}
                    required
                  >
                    <option value="">Select district</option>
                    <option value="colombo">Colombo</option>
                    <option value="gampaha">Gampaha</option>
                    <option value="kandy">Kandy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                  <Calendar className="w-6 h-6" /> Court Date <span className="text-sm text-gray-500">(Optional)</span>
                </label>
                <input
                  type="date"
                  name="courtDate"
                  value={formData.courtDate}
                  onChange={handleChange}
                  className="w-full p-4 border border-indigo-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm text-gray-800 disabled:bg-gray-200"
                  disabled={loading || noCourtDate}
                />
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="noCourtDate"
                    checked={noCourtDate}
                    onChange={(e) => setNoCourtDate(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 border-indigo-200 rounded focus:ring-indigo-400"
                    disabled={loading}
                  />
                  <label htmlFor="noCourtDate" className="text-sm text-gray-700 font-medium">
                    No court date scheduled yet
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" /> Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a general description (no personal details)"
                  className="w-full p-4 border border-indigo-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 shadow-sm text-gray-800 placeholder-gray-500 resize-none h-36 text-lg"
                  disabled={loading}
                  required
                />
              </div>

              <div className="flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-6 h-6 text-indigo-600 border-indigo-200 rounded focus:ring-indigo-400"
                  disabled={loading}
                />
                <label htmlFor="agree" className="text-base text-gray-700 font-medium tracking-wide">
                  I agree to post this case anonymously and confirm it contains no sensitive information.
                </label>
              </div>

              <div className="text-center text-base text-gray-600 tracking-wide">
                <CheckCircle className="w-5 h-5 inline-block mr-2 text-indigo-500" />
                Note: Cases expire after 14 days if no lawyer expresses interest.
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
              >
                <button
                  type="submit"
                  className={`flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg text-lg font-semibold w-full max-w-md ${
                    loading || !agreed || pendingCasesCount >= 3 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading || !agreed || pendingCasesCount >= 3}
                >
                  <Send className="w-6 h-6 animate-[wiggle_1s_infinite]" />
                  {loading ? "Submitting..." : "Post Case"}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default PostCaseForm;