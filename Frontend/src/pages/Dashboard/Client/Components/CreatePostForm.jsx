import { useState, useContext } from 'react';
import { FaCalendarAlt, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Adjust path

function CreatePostForm() {
  const { userData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    caseType: '',
    district: '',
    courtDate: '',
    description: '',
    clientId: userData?._id || '', // Auto-set from logged-in user
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?._id) {
      setError('You must be logged in to create a case.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/case/create-case`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to create case');
      }

      const result = await response.json();
      console.log('Case created:', result);
      navigate('/lawyer-dashboard'); // Redirect to dashboard
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-600 text-center mb-6">
          Create a Post
        </h1>
        <div className="border-b border-gray-200 mb-6"></div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg text-purple-400 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject..."
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div>
              <label className="block text-lg text-purple-400 mb-2">Case Type</label>
              <div className="relative">
                <select
                  name="caseType"
                  value={formData.caseType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={loading}
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
              <label className="block text-lg text-purple-400 mb-2">District</label>
              <div className="relative">
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={loading}
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
            <label className="block text-lg text-purple-400 mb-2">Court Date</label>
            <div className="relative">
              <input
                type="date"
                name="courtDate"
                value={formData.courtDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg text-purple-400 mb-2">Description</label>
            <div className="bg-gray-50 rounded-lg p-4">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a clear description about your case"
                className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                disabled={loading}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-purple-500"
                  disabled={loading}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full w-full max-w-md transition-colors duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;