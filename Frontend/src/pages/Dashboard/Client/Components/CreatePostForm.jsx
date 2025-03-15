import React, { useState, useContext } from 'react';
import { FaCalendarAlt, FaPlus, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../context/AppContext';
import Sidebar from './Sidebar';
import Header from './Header';

function PostCaseForm() {
  const { userData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    caseType: '',
    district: '',
    courtDate: '',
    description: '',
    clientId: userData?._id || '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  console.log('PostCaseForm rendered', { userData, backendUrl }); // Debug render

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', { formData, agreed }); // Debug submit start

    if (!userData?._id) {
      setError('You must be logged in to create a case.');
      console.log('No user ID');
      return;
    }
    if (!agreed) {
      setError('You must agree to post this case anonymously.');
      console.log('Agreement not checked');
      return;
    }

    setLoading(true);
    setError(null);
    console.log('Fetching started');

    try {
      const response = await fetch(`${backendUrl}/api/case/create-case`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      console.log('Fetch response received', { status: response.status }); // Debug response

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Fetch error data', errorData);
        throw new Error(errorData.msg || 'Failed to create case');
      }

      const result = await response.json();
      console.log('Case created successfully:', result);
      navigate('/lawyer-dashboard');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('Loading reset'); // Confirm reset
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 xl:ml-72">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 pt-20 lg:pt-24">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-4xl border-t-4 border-blue-600">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-4">
              Post a Case Anonymously
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Please avoid including sensitive or personal information.
            </p>

            {error && (
              <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}

            {loading && (
              <div className="mb-6 p-3 bg-blue-100 text-blue-700 rounded-lg text-center">
                Submitting your case, please wait...
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-lg font-medium text-blue-600 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Property Dispute"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={loading}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label className="block text-lg font-medium text-blue-600 mb-2">
                    Case Type
                  </label>
                  <div className="relative">
                    <select
                      name="caseType"
                      value={formData.caseType}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      disabled={loading}
                      required
                    >
                      <option value="">Select case type</option>
                      <option value="criminal">Criminal</option>
                      <option value="civil">Civil</option>
                      <option value="family">Family</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-blue-600 mb-2">
                    District
                  </label>
                  <div className="relative">
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      disabled={loading}
                      required
                    >
                      <option value="">Select district</option>
                      <option value="colombo">Colombo</option>
                      <option value="gampaha">Gampaha</option>
                      <option value="kandy">Kandy</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-medium text-blue-600 mb-2">
                  Court Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="courtDate"
                    value={formData.courtDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    disabled={loading}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-medium text-blue-600 mb-2">
                  Description
                </label>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a general description (no personal details)"
                    className="w-full p-3 bg-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32 overflow-y-auto"
                    disabled={loading}
                    required
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-blue-500"
                      disabled={loading}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6 flex items-center justify-center">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  disabled={loading}
                />
                <label
                  htmlFor="agree"
                  className="ml-2 text-sm text-gray-700 font-medium"
                >
                  I agree to post this case anonymously and confirm it contains no sensitive information.
                </label>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full w-full max-w-md transition-colors duration-200 flex items-center justify-center ${
                    loading || !agreed ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading || !agreed}
                >
                  {loading ? 'Submitting...' : (
                    <>
                      <FaCheck className="mr-2" /> Post Case
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PostCaseForm;