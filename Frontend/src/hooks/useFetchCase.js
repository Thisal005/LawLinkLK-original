// hooks/useFetchCase.js
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const useFetchCase = (caseId) => {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchCase = async () => {
      if (!caseId) {
        setCaseData(null);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`${backendUrl}/api/case/${caseId}`, {
          withCredentials: true,
        });

        console.log("caseId:", caseId, "Response:", res.data);

        if (res.data && Object.keys(res.data).length > 0) {
          setCaseData(res.data);
        } else {
          setCaseData(null);
        }
      } catch (error) {
        console.error("Error fetching case:", error.response?.data || error.message);

        // Handle specific status codes
        if (error.response?.status === 403) {
          // Forbidden: User lacks permission, set data to null silently
          setCaseData(null);
          console.log("Access denied to case:", caseId);
        } else if (error.response?.status === 404) {
          // Not Found: Case doesn’t exist, set data to null silently
          setCaseData(null);
        } else {
          // Other errors (e.g., 500, network issues)
          toast.error(error.response?.data?.msg || "Failed to fetch case details");
          setCaseData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [caseId, backendUrl]);

  return { caseData, loading };
};

export default useFetchCase;