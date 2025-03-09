import React, { useState } from 'react';

function CreateCasePostForm() {
  const [formData, setFormData] = useState({
    subject: '',
    caseType: '',
    district: '',
    courtDate: '',
    description: '',
  });
  const [confirm, setConfirm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Track submission success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    // Simulate submitting the case (e.g., to a backend or log for now)
    console.log('Case Submitted for Lawyers:', formData);
    setFormData({ subject: '', caseType: '', district: '', courtDate: '', description: '' });
    setConfirm(false);
    setSubmitted(true); // Show success message
    setTimeout(() => setSubmitted(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">Create Case Post</h1>
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
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-lg text-purple-400 mb-2">Case Type</label>
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
              <label className="block text-lg text-purple-400 mb-2">District</label>
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
            <label className="block text-lg text-purple-400 mb-2">Court Date</label>
            <input
              type="date"
              name="courtDate"
              value={formData.courtDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg text-purple-400 mb-2">Description (max 500 chars)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a clear description"
              maxLength={500}
              className="w-full p-3 border rounded-lg min-h-[100px]"
              required
            />
            <p className="text-sm text-gray-500">{formData.description.length}/500</p>
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={confirm}
                onChange={handleConfirmChange}
                className="mr-2"
              />
              <span className="text-purple-400">I confirm this case submission</span>
            </label>
          </div>
          <button type="submit" className="bg-purple-600 text-white py-3 px-8 rounded-full w-full max-w-md mx-auto block">
            Submit Case
          </button>
        </form>
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">Please confirm by checking the box.</p>
            <button onClick={() => setShowPopup(false)} className="bg-purple-600 text-white py-2 px-4 rounded-full">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCasePostForm;