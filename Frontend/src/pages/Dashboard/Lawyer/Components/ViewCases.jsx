// frontend/src/pages/Dashboard/Lawyer/Components/ViewCases.jsx
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CaseCard from "./ViewCaseCard";

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
        }
      } catch (error) {
        console.error("Error fetching cases:", {
          message: error.message,
          response: error.response ? {
            status: error.response.status,
            data: error.response.data,
          } : "No response",
        });
        toast.error(error.response?.data?.msg || "Something went wrong.");
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCases();
  }, [lawyerData, backendUrl, navigate]);

  const handleSendOffer = async (caseId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/case/offer/${caseId}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Offer sent to the client!");
      } else {
        toast.error(response.data.msg || "Failed to send offer.");
      }
    } catch (error) {
      console.error("Error sending offer:", error.response?.data);
      toast.error(error.response?.data?.msg || "Failed to send offer.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab="View Cases" />
      <div className="flex-1 flex flex-col lg:ml-64 xl:ml-72">
        <Header
          displayName={lawyerData?.fullName || "Lawyer"}
          practiceAreas={lawyerData?.practiceAreas || "Lawyer"}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-6">
            Available Anonymous Cases
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Browse unassigned cases posted anonymously by clients.
          </p>

          {loading ? (
            <div className="text-center text-gray-600">Loading cases...</div>
          ) : cases.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {cases.map((caseItem) => (
                <CaseCard
                  key={caseItem._id}
                  title={caseItem.subject || "Untitled Case"}
                  description={caseItem.description || "No description provided."}
                  expanded={false}
                  onSendOffer={() => handleSendOffer(caseItem._id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">No cases available.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ViewCases;