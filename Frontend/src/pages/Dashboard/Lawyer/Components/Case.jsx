import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import { FaComments, FaVideo } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CaseCard from "../Components/dashboard/lawyer/CaseCard";
import Sidebar from "../../Client/Components/Sidebar";
import Header from "../Components/Header";
import TaskForm from "../Components/dashboard/lawyer/assignTask";
import NoteForm from "../Components/dashboard/lawyer/CreateNote";
import TodoList from "../Components/ToDoList";

/**
 * Case component for displaying case details and related actions.
 */
function Case() {
  const { userData, backendUrl } = useContext(AppContext); // Access userData and backendUrl from context
  const navigate = useNavigate();
  const { caseId } = useParams(); // Get caseId from URL params (e.g., /case/:caseId)

  // State for case data and loading
  const [caseData, setCaseData] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch case details when caseId changes
  useEffect(() => {
    const fetchCaseDetails = async () => {
      if (!caseId) {
        toast.error("No case ID provided");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${backendUrl}/api/case/${caseId}`, {
          withCredentials: true,
        });
        console.log("Case data:", res.data);
        setCaseData(res.data);
        setClientId(res.data.clientId || null); // Assuming case data includes clientId
      } catch (error) {
        console.error("Error fetching case:", error.response?.data || error.message);
        if (error.response?.status === 403) {
          toast.error("You don’t have permission to view this case");
        } else if (error.response?.status === 404) {
          toast.error("Case not found");
        } else {
          toast.error(error.response?.data?.msg || "Failed to load case details");
        }
        setCaseData(null);
        setClientId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId, backendUrl]);

  return (
    <div>
      <Header />
      <Sidebar activeTab="Dashboard" />

      <main className="ml-64 p-6 lg:p-8 pt-24">
        {/* Case Information Card */}
        <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-5 mb-5 mt-5 relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl w-290">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1 space-y-6">
              {loading ? (
                <p>Loading case details...</p>
              ) : caseData ? (
                <CaseCard caseId={caseId} />
              ) : (
                <p className="text-gray-600">No case details available.</p>
              )}

              <div className="flex flex-row gap-5">
                <button
                  onClick={() => navigate("/chat")}
                  className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-3 rounded-md shadow-md transition-all transform hover:scale-105 active:scale-95 text-sm"
                >
                  <FaComments className="h-5 w-10 mr-1" />
                  Chat
                </button>

                <button
                  onClick={() => navigate("/chat")} // Update this to a video call route if needed
                  className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-1.5 px-3 rounded-md shadow-md transition-all transform hover:scale-105 active:scale-95 text-sm"
                >
                  <FaVideo className="h-5 w-10 mr-1" />
                  Video Call
                </button>
              </div>
            </div>

            <div className="self-center md:self-start">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <video
                  src="images/case.mp4"
                  autoPlay
                  loop
                  muted
                  className="w-full h-[180px] object-cover rounded-lg"
                  aria-label="Legal information video"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Task Form */}
        {loading ? (
          <p>Loading task form...</p>
        ) : caseData && clientId ? (
          <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-5 mb-5 mt-5 relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl w-290">
            <TaskForm caseId={caseId} clientId={clientId} />
          </div>
        ) : (
          <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-5 mb-5 mt-5">
            <p className="text-gray-600">No case selected to assign tasks.</p>
          </div>
        )}

        {/* Grid layout for note forms and todo list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-rows-1 md:grid-rows-2 gap-5">
            {/* Note Form 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
              <div className="h-[300px]">
                {loading ? (
                  <p>Loading note form...</p>
                ) : caseData && clientId ? (
                  <NoteForm caseId={caseId} clientId={clientId} />
                ) : (
                  <p className="text-gray-600">No case selected to add notes.</p>
                )}
              </div>
            </div>

            {/* Note Form 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
              <div className="h-[200px]">
                {loading ? (
                  <p>Loading note form...</p>
                ) : caseData && clientId ? (
                  <NoteForm caseId={caseId} clientId={clientId} />
                ) : (
                  <p className="text-gray-600">No case selected to add notes.</p>
                )}
              </div>
            </div>
          </div>

          {/* Todo List */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="h-[550px]">
              <TodoList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Case;