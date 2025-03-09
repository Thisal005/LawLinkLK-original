import React, { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaCalendarAlt, FaQuestionCircle, FaBell, FaUserCircle } from 'react-icons/fa';

function Topbar() {
  const { isLoggedIn, setIsLoggedIn, setUserData, setLawyerData, backendUrl, userData } = useAuthContext();
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false);

  const fullName = userData?.fullName || 'DESHAN FERNANDO';
  const [firstName, lastName] = fullName.split(' ');

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUserData(null);
      setLawyerData(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
      toast.error('Error logging out');
    }
  };

  return (
    <div className="bg-white h-16 border-b flex items-center justify-end px-6">
      <div className="flex items-center space-x-6">
        <button className="text-gray-600 hover:text-blue-600">
          <FaCalendarAlt className="text-xl" />
        </button>
        <button className="text-gray-600 hover:text-blue-600">
          <FaQuestionCircle className="text-xl" />
        </button>
        <button className="text-gray-600 hover:text-blue-600">
          <FaBell className="text-xl" />
        </button>
        <div
          className="flex items-center relative cursor-pointer"
          onClick={() => setShowProfileCard(!showProfileCard)}
        >
          <div className="mr-2 text-right">
            <div className="font-bold text-blue-600">{firstName || 'DESHAN'}</div>
            <div className="text-xs text-gray-500">{lastName || 'FERNANDO'}</div>
          </div>
          <FaUserCircle className="text-3xl text-gray-400" />
          {showProfileCard && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-md p-4 w-48 z-10">
              <button
                onClick={() => navigate('/dashboard/settings')}
                className="block w-full text-left text-gray-600 hover:text-blue-600 py-2"
              >
                Profile Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-gray-600 hover:text-red-600 py-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;