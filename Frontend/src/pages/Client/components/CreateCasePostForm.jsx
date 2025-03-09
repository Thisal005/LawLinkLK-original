import React, { useState } from 'react';
import { FaCalendarAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // For linking to Privacy Policy

function CreatePostForm() {
  const [formData, setFormData] = useState({
    subject: '',
    caseType: '',
    district: '',
    courtDate: '',
    description: ''
  });
  const [confirm, setConfirm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirmChange = (e) => {
    setConfirm(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!confirm) {
      setShowPopup(true);
      return;
    }
    console.log('Case Submitted for Lawyers:', formData);
    setFormData({ subject: '', caseType: '', district: '', courtDate: '', description: '' });
    setConfirm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Hide success message after 3 seconds
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">Create a Post</h1>
      <div className="border-b border-gray-200 mb-6"></div>

      {submitted ? (
        <div className="text-green-600 text-center mb-4">Case submitted successfully!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg text-purple-400 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject..."
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-lg text-purple-400 mb-2">Case Type</label>
              <div className="relative">
                <select
                  name="caseType"
                  value={formData.caseType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select case type</option>
                  <option value="criminal">Criminal</option>
                  <option value="civil">Civil</option>
                  <option value="family">Family</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
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
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select district</option>
                  <option value="colombo">Colombo</option>
                  <option value="gampaha">Gampaha</option>
                  <option value="kandy">Kandy</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
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
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg text-purple-400 mb-2">Description (max 500 chars)</label>
            <div className="bg-gray-50 rounded-lg p-4">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write clear description about your case"
                maxLength={500}
                className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                required
              ></textarea>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">{formData.description.length}/500</p>
                <button type="button" className="text-gray-400 hover:text-primary">
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={confirm}
                onChange={handleConfirmChange}
                className="mr-2"
              />
              <span className="text-purple-400">
                I confirm this case submission and agree to the{' '}
                <Link to="/privacy-policy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-accent hover:bg-primary text-white font-bold py-3 px-8 rounded-full w-full max-w-md transition-colors duration-200"
            >
              Submit Case
            </button>
          </div>
        </form>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4 text-gray-700">
              Please confirm your case submission and agree to the Privacy Policy by checking the box.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-primary text-white py-2 px-4 rounded-full hover:bg-accent transition-colors duration-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePostForm;