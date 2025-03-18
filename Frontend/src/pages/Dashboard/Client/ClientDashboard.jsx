// ClientDashboard.jsx
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import CaseCard from "./Components/CaseCard";
import TaskList from "../TaskList";
import NoteList from "./Components/NoteList";
import lawyer2 from "../../../assets/Login_Cl_Lw/images/lawyer2.mp4";

function ClientDashboard() {
  const { userData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  // Added state for expired cases visibility
  const [showExpired, setShowExpired] = useState(true);

  useEffect(() => {
    const fetchUserCases = async () => {
      if (!userData?._id) {
        console.log("No user ID available");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`${backendUrl}/api/case/user/${userData._id}`, {
          withCredentials: true,
        });
        console.log("User cases response:", res.data);
        setCases(res.data.data || []);
      } catch (error) {
        console.error("Error fetching user cases:", error.response?.data || error.message);
        if (error.response?.status === 403) {
          toast.error("You don’t have permission to view cases");
        } else {
          toast.error(error.response?.data?.msg || "Failed to fetch cases");
        }
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCases();
  }, [userData, backendUrl]);

  const caseId = cases.length > 0 ? cases[0]._id : null;

  return (
    <div>
      <Header />
      <Sidebar activeTab="Dashboard" />
      <main className="ml-64 p-6 lg:p-8 pt-24">
        <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-5 mb-6 mt-5 relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl w-290">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Welcome back, {userData?.fullName || "Counselor"}
              </h2>
              {loading ? (
                <p>Loading cases...</p>
              ) : caseId ? (
                <CaseCard caseId={caseId} />
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600 text-lg">
                    It looks like you don’t have any cases yet. Let’s get started!
                  </p>
                  <button
                    onClick={() => navigate("/post-case")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all"
                  >
                    Create Your First Case
                  </button>
                </div>
              )}
            </div>
            <div className="self-center md:self-start">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transform transition-all duration-300 hover:shadow-lg">
                <video
                  src={lawyer2}
                  autoPlay
                  loop
                  muted
                  className="w-full h-[240px] object-cover rounded-lg"
                  aria-label="Legal information video"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Added section for all cases including expired */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">Your Cases</h3>
            <button
              onClick={() => setShowExpired((prev) => !prev)}
              className="text-indigo-600 hover:underline text-sm"
            >
              {showExpired ? "Hide Expired Cases" : "Show Expired Cases"}
            </button>
          </div>
          {loading ? (
            <p>Loading cases...</p>
          ) : cases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cases
                .filter((c) => showExpired || c.status !== "Expired")
                .map((caseItem) => (
                  <CaseCard key={caseItem._id} caseId={caseItem._id} />
                ))}
            </div>
          ) : (
            <p className="text-gray-600">No cases found.</p>
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quick Start Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
              <h4 className="font-medium text-gray-800">Learn the Basics</h4>
              <p className="text-gray-600">Watch a tutorial on managing your cases.</p>
              <a href="/tutorial" className="text-indigo-600 hover:underline">Watch Now</a>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
              <h4 className="font-medium text-gray-800">Contact Support</h4>
              <p className="text-gray-600">Need help? Reach out to our team.</p>
              <button
                onClick={() => navigate("/support")}
                className="text-indigo-600 hover:underline"
              >
                Get Support
              </button>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
              <h4 className="font-medium text-gray-800">Explore Features</h4>
              <p className="text-gray-600">Discover what you can do with your dashboard.</p>
              <a href="/features" className="text-indigo-600 hover:underline">Learn More</a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-48 h-48 bg-green-100 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-56 h-56 bg-teal-100 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
            </div>
            <div className="relative z-10 h-[550px]">
              {loading ? (
                <p>Loading tasks...</p>
              ) : caseId ? (
                <TaskList caseId={caseId} />
              ) : (
                <div className="text-center text-gray-500">
                  <p className="text-lg">No tasks yet.</p>
                  <p>Create a case to start adding tasks!</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-100 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-pink-100 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
            </div>
            <div className="relative z-10 h-[550px]">
              {loading ? (
                <p>Loading notes...</p>
              ) : caseId ? (
                <NoteList />
              ) : (
                <div className="text-center text-gray-500">
                  <p className="text-lg">No notes yet.</p>
                  <p>Add a case to start taking notes!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/chat")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
        >
          Chat
        </button>
      </main>
    </div>
  );
}

export default ClientDashboard;