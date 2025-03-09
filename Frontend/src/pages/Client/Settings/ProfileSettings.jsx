import React, { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProfileSettings() {
  const { userData, backendUrl } = useAuthContext();
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || '',
    email: userData?.email || '',
    contact: userData?.contact || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${backendUrl}/api/user/update`, formData, { withCredentials: true });
      if (response.data.success) {
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Profile Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-blue-600 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-600 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-600 mb-2">Contact</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-3 px-8 rounded-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfileSettings;