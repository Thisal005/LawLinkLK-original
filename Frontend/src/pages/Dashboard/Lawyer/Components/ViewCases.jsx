// frontend/src/pages/Dashboard/Lawyer/Components/ViewCases.jsx
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header"; // Fixed import path (assuming this is correct)
import CaseCard from "./CaseCard"; // Team member’s CaseCard

const ViewCases = () => {
  const { lawyerData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCases = async () => {
      // Check if lawyerData exists and has an ID
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

        console.log("Full API Response:", response); // Log the entire response
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
          response: error.response?.data,
          status: error.response?.status,
        });
        toast.error(error.response?.data?.msg || "Something went wrong.");
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCases();
  }, [lawyerData, backendUrl, navigate]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar activeTab="View Cases" />
      <div className="flex-1 flex flex-col lg:ml-64 xl:ml-72">
        <Header
          displayName={lawyerData?.fullName || "Lawyer"}
          practiceAreas={lawyerData?.practiceAreas || "Lawyer"}
        />
        <main className="flex-1 p-6 mt-16 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Client Cases</h2>
          <div className="max-w-6xl mx-auto space-y-4">
            {loading ? (
              <p className="text-gray-600">Loading cases...</p>
            ) : cases.length > 0 ? (
              cases.map((caseItem, index) => {
                console.log(`Rendering case ${index}:`, caseItem); // Log each case being rendered
                return (
                  <CaseCard
                    key={index}
                    title={caseItem.subject || "Untitled Case"}
                    description={caseItem.description || "No description provided."}
                    expanded={false}
                  />
                );
              })
            ) : (
              <p className="text-gray-600">No cases available.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewCases;