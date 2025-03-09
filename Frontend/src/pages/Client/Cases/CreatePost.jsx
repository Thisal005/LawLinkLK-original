import React, { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function CreatePost() {
  const { backendUrl } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    caseType: '',
    district: '',
    courtDate: '',
    description: '',
    noCourtDate: false,
  });
  const [confirm, setConfirm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleConfirmChange = (e) => {
    setConfirm(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirm) {
      setShowPopup(true);
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/case/create`, formData, { withCredentials: true });
      if (response.data.success) {
        setFormData({ subject: '', caseType: '', district: '', courtDate: '', description: '', noCourtDate: false });
        setConfirm(false);
        setSubmitted(true);
        toast.success('Case submitted successfully!');
        setTimeout(() => {
          setSubmitted(false);
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      toast.error('Error submitting case');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Create Case Post</h1>
      {submitted ? (
        <div className="text-green-600 text-center mb-4">Case submitted successfully!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg text-blue-400 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject..."
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-lg text-blue-400 mb-2">Case Type</label>
              <select
                name="caseType"
                value={formData.caseType}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select case type</option>
                <option value="criminal">Criminal</option>
                <option value="civil">Civil</option>
                <option value="family">Family</option>
              </select>
            </div>
            <div>
              <label className="block text-lg text-blue-400 mb-2">District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select district</option>
                <option value="colombo">Colombo</option>
                <option value="gampaha">Gampaha</option>
                <option value="kandy">Kandy</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-lg text-blue-400 mb-2">Court Date (Optional)</label>
            <div className="flex items-center">
              <input
                type="date"
                name="courtDate"
                value={formData.courtDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                disabled={formData.noCourtDate}
              />
              <label className="ml-4 flex items-center">
                <input
                  type="checkbox"
                  name="noCourtDate"
                  checked={formData.noCourtDate}
                  onChange={handleChange}
                  className="mr-2"
                />
                No Court Date
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-lg text-blue-400 mb-2">Description (max 500 chars)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a clear description (avoid personal details or evidence)"
              maxLength={500}
              className="w-full p-3 border rounded-lg min-h-[100px]"
              required
            />
            <p className="text-sm text-gray-500">{formData.description.length}/500</p>
            <p className="text-sm text-red-500">
              Do not include personal information, evidence, or identifying details. This is for finding a lawyer only.
            </p>
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={confirm}
                onChange={handleConfirmChange}
                className="mr-2"
              />
              <span className="text-blue-400">
                I confirm this case submission and agree to the{' '}
                <Link to="/privacy-policy" className="underline hover:text-blue-600">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>
          <button type="submit" className="bg-blue-600 text-white py-3 px-8 rounded-full w-full max-w-md mx-auto block">
            Submit Case
          </button>
        </form>
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">Please confirm by checking the box and agreeing to the Privacy Policy.</p>
            <button onClick={() => setShowPopup(false)} className="bg-blue-600 text-white py-2 px-4 rounded-full">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePost;