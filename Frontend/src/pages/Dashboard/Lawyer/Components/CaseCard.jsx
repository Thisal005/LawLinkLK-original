// frontend/src/Components/CaseCard.jsx
import React from "react";
import useFetchCase from "../../../../hooks/useFetchCase";

const CaseCard = ({ caseId }) => {
  const { caseData, loading } = useFetchCase(caseId);

  if (loading) {
    return <p className="text-gray-600">Loading case details...</p>;
  }

  if (!caseData) {
    return <p className="text-gray-600">Case not found.</p>;
  }

  const capitalizeText = (text) => {
    if (!text || typeof text !== "string") {
      return "N/A";
    }
    return text
      .split(/[- ]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

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
      onClick={() => console.log("Navigate to case details:", caseData._id)}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="mt-2 text-3xl font-bold text-blue-500">
            {caseData.caseName || "Unnamed Case"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Client: {caseData.clientId?.fullName || "Unknown Client"}
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
          <span className="text-gray-600">Case ID:</span>
          <span className="font-semibold text-gray-900">
            {caseData.caseId || caseData._id || "N/A"}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-gray-600">Case Type:</span>
          <span className="font-semibold text-gray-900">
            {capitalizeText(caseData.caseType) || "N/A"}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-gray-600">District:</span>
          <span className="font-semibold text-gray-900">
            {capitalizeText(caseData.district) || "N/A"}
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
            {caseData.nextCourtDate
              ? new Date(caseData.nextCourtDate).toLocaleDateString()
              : "TBD"}
          </span>
        </li>
      </ul>
    </article>
  );
};

export default CaseCard;