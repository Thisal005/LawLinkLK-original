import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import CaseCard from "./Components/CaseCard";
import BasicLineChart from "./Components/Linechart";

const LawyerDashboard = () => {
  const { lawyerData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      if (!lawyerData?._id) {
        toast.error("Please log in as a lawyer to view your dashboard.");
        navigate("/lawyer-login");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/case/user/${lawyerData._id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          const activeCases = (response.data.data || []).filter(
            (caseItem) =>
              caseItem.lawyerId?.toString() === lawyerData._id.toString() &&
              caseItem.status !== "completed"
          );
          console.log("All cases:", response.data.data);
          console.log("Active cases:", activeCases);
          setCases(activeCases);
          if (activeCases.length === 0) {
            toast.info("You have no active cases at the moment.");
          }
        } else {
          toast.error(response.data.msg || "Failed to fetch cases.");
          setCases([]);
        }
      } catch (error) {
        console.error("Error fetching cases:", error.response?.data || error.message);
        toast.error(error.response?.data?.msg || "Something went wrong.");
        setCases([]);
        if (error.response?.status === 401) navigate("/lawyer-login");
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [lawyerData, backendUrl, navigate]);

  const upcomingEvents = [
    { id: 1, title: "Client Meeting - Smith vs. Jones", time: "Today, 2:00 PM", type: "Meeting" },
    { id: 2, title: "Court Hearing - Johnson Case", time: "Tomorrow, 9:30 AM", type: "Hearing" },
    { id: 3, title: "Document Submission Deadline", time: "Mar 20, 5:00 PM", type: "Deadline" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar activeTab="Dashboard" />
      <div className="flex-1 flex flex-col lg:ml-64 xl:ml-72">
        <Header displayName={lawyerData?.fullName} practiceAreas={lawyerData?.practiceAreas || "Lawyer"} />
        <main className="flex-1 p-6 mt-16 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back, {lawyerData?.fullName || "Counselor"}
              </h2>
              <p className="text-sm text-blue-600 mt-2">
                {cases.length} active cases | {upcomingEvents.length} upcoming events
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {loading ? (
              <p className="text-gray-600">Loading cases...</p>
            ) : cases.length > 0 ? (
              cases.map((caseItem) => <CaseCard key={caseItem._id} caseId={caseItem._id} />)
            ) : (
              <p className="text-gray-600">No active cases found.</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings Overview</h2>
              <div className="h-[280px]">
                <BasicLineChart />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                  >
                    <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600">{event.time} - {event.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LawyerDashboard;