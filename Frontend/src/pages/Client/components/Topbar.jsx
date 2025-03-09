import React from 'react';
import { useAuthContext } from '../../../context/AuthContext'; // Adjust path
import { useNavigate } from 'react-router-dom'; // For redirect after logout
import { toast } from 'react-toastify'; // For feedback
import axios from 'axios';

function Topbar() {
  const { isLoggedIn, setIsLoggedIn, setUserData, setLawyerData, backendUrl } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make API call to logout (optional, depends on backend)
      await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      
      // Clear auth state
      setIsLoggedIn(false);
      setUserData(null);
      setLawyerData(null);
      
      // Clear any socket connection if needed (optional)
      // If SocketContext provides a way to close socket, add it here
      
      toast.success('Logged out successfully');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error.message);
      toast.error('Error logging out');
    }
  };

  return (
    <div className="bg-white h-16 border-b flex items-center justify-end px-6">
      <div className="flex items-center space-x-6">
        <button className="text-gray-600 hover:text-purple-600">[Calendar]</button>
        <button className="text-gray-600 hover:text-purple-600">[Help]</button>
        <button className="text-gray-600 hover:text-purple-600">[Notifications]</button>
        <div className="flex items-center">
          <div className="mr-2 text-right">
            <div className="font-bold text-purple-600">DESHAN</div>
            <div className="text-xs text-gray-500">FERNANDO</div>
          </div>
          <span className="text-3xl text-gray-400">[User]</span>
        </div>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Topbar;