import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const useFetchCase = (caseId) => {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state for better debugging
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchCase = async () => {
      if (!caseId || !/^[0-9a-fA-F]{24}$/.test(caseId)) {
        console.warn("useFetchCase - Invalid or missing caseId:", caseId);
        setCaseData(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`${backendUrl}/api/case/${caseId}`, {
          withCredentials: true,
        });

        console.log("useFetchCase - caseId:", caseId, "Full Response:", res.data);

        if (res.data.success && res.data.data) {
          setCaseData(res.data.data); // Set to the case object, not the full response
          console.log("useFetchCase - Set caseData:", res.data.data);
        } else {
          console.warn("useFetchCase - No valid case data:", res.data);
          setCaseData(null);
        }
      } catch (error) {
        console.error("useFetchCase - Error fetching case:", error.response?.data || error.message);
        setError(error.response?.data?.msg || error.message);

        // Handle specific status codes
        if (error.response?.status === 403) {
          console.log("useFetchCase - Access denied to case:", caseId);
          setCaseData(null);
        } else if (error.response?.status === 404) {
          console.log("useFetchCase - Case not found:", caseId);
          setCaseData(null);
        } else {
          toast.error(error.response?.data?.msg || "Failed to fetch case details");
          setCaseData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [caseId, backendUrl]);

  return { caseData, loading, error }; // Return error for potential use in CaseCard
};

export default useFetchCase;