import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import axios from 'axios';

function CaseList() {
  const { backendUrl, userData } = useAuthContext();
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      if (userData) {
        try {
          const response = await axios.get(`${backendUrl}/api/case/client-cases`, { withCredentials: true });
          setCases(response.data.cases || []);
        } catch (error) {
          console.error('Error fetching cases:', error);
        }
      }
    };
    fetchCases();
  }, [userData, backendUrl]);

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Cases</h1>
      {cases.length === 0 ? (
        <p>No cases posted yet.</p>
      ) : (
        cases.map((caseItem) => (
          <div key={caseItem.id} className="border-b py-4">
            <h2 className="text-xl font-bold text-blue-600">{caseItem.subject}</h2>
            <p>Type: {caseItem.caseType}</p>
            <p>District: {caseItem.district}</p>
            <p>Court Date: {caseItem.noCourtDate ? 'None' : caseItem.courtDate}</p>
            <p>{caseItem.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CaseList;