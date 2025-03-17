import React from "react";
import useFetchCase from "../../../../hooks/useFetchCase";
import { useNavigate } from "react-router-dom";

const CaseCard = ({ caseId }) => {
  const { caseData, loading } = useFetchCase(caseId);
  const navigate = useNavigate();

  // Debug logs
  console.log("CaseCard - Input caseId:", caseId);
  console.log("CaseCard - Fetched caseData:", caseData);
  console.log("CaseCard - Loading:", loading);

  if (loading) {
    return <p className="text-gray-600">Loading case details...</p>;
  }

  if (!caseData) {
    console.warn("CaseCard - No caseData for caseId:", caseId);
    return (
      <div className="bg-white border border-gray-200 p-6 rounded-2xl text-center">
        <p className="text-gray-600 mb-4">You don't have any cases yet.</p>
        <button
          onClick={() => navigate("/post-case")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
        >
          Post Your First Case
        </button>
      </div>
    );
  }

  const isPending = caseData.status === "pending" || !caseData.lawyerId;

  const capitalizeStatus = (status) => {
    if (!status || typeof status !== "string") {
      return "Unknown";
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <article
      className="group bg-white border border-gray-200 p-4 rounded-2xl hover:border-blue-500 hover:bg-blue-50/10 transition-all duration-300 hover:shadow-lg cursor-pointer"
      role="button"
      tabIndex="0"
      aria-label="View your case details"
      onClick={() => navigate(`/case/${caseData._id}`)}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xs uppercase tracking-wide text-gray-600 font-semibold">
            Your Case
          </h3>
          <p className="mt-2 text-3xl font-bold text-blue-500">
            {caseData.subject || "Unnamed Case"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Your Lawyer: {isPending ? "TBA" : caseData.lawyerId?.fullName || "None"}
          </p>
        </div>
        <div
          className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center relative"
          aria-hidden="true"
        >
          <span
            className={`w-4 h-4 rounded-full ${
              caseData.status === "ongoing"
                ? "bg-blue-500"
                : caseData.status === "pending"
                ? "bg-orange-500"
                : caseData.status === "expired"
                ? "bg-red-500"
                : "bg-gray-500"
            } shadow-[0_0_12px_rgba(16,185,129,0.3)] absolute animate-ping`}
          ></span>
          <span
            className={`w-4 h-4 rounded-full ${
              caseData.status === "ongoing"
                ? "bg-blue-500"
                : caseData.status === "pending"
                ? "bg-orange-500"
                : caseData.status === "expired"
                ? "bg-red-500"
                : "bg-gray-500"
            } shadow-[0_0_12px_rgba(16,185,129,0.3)] absolute`}
          ></span>
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm border-t border-gray-100 pt-4">
        <li className="flex items-center gap-2">
          <span className="text-gray-600">Case Subject:</span>
          <span className="font-semibold text-gray-900">
            {caseData.subject || "Unnamed Case"}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-gray-600">Case Type:</span>
          <span className="font-semibold text-gray-900">
            {caseData.caseType || "N/A"}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-gray-600">Status:</span>
          <span
            className={`font-semibold ${
              caseData.status === "ongoing"
                ? "text-green-700"
                : caseData.status === "pending"
                ? "text-orange-700"
                : caseData.status === "expired"
                ? "text-red-700"
                : "text-gray-700"
            }`}
          >
            {capitalizeStatus(caseData.status)}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-gray-600">Next Court Date:</span>
          <span className="font-semibold text-gray-900">
            {isPending
              ? "TBA"
              : caseData.courtDate
              ? new Date(caseData.courtDate).toLocaleDateString()
              : "TBD"}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-gray-600">Expires On:</span>
          <span className="font-semibold text-gray-900">
            {caseData.expiresAt
              ? new Date(caseData.expiresAt).toLocaleDateString()
              : "N/A"}
          </span>
        </li>
      </ul>
    </article>
  );
};

export default CaseCard;