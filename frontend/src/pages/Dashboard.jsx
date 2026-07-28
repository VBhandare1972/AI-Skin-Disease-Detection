import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    // Verify token with backend
    const verifyToken = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiBaseUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.success) {
          setUser(response.data.user);
        }
        setLoading(false);
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EBF4F6] via-[#7AB2B2]/20 to-[#EBF4F6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#088395]"></div>
      </div>
    );
  }

  return (
    <div className="
      relative
      min-h-screen
      bg-gradient-to-br
      from-[#EBF4F6]
      via-[#7AB2B2]/20
      to-[#EBF4F6]
      p-8
    ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#09637E]">
            Welcome, {user?.name}!
          </h1>
          <button
            onClick={handleLogout}
            className="
              bg-red-500
              text-white
              px-6
              py-2
              rounded-lg
              hover:bg-red-600
              transition-colors
            "
          >
            Logout
          </button>
        </div>

        {/* User Info Card */}
        <GlassCard className="p-6 mb-8">
          <h2 className="text-xl font-bold text-[#088395] mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user?.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{user?.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium capitalize">{user?.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">{user?.city}</p>
            </div>
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#088395]/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#088395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-[#088395] mb-2">New Diagnosis</h3>
            <p className="text-sm text-gray-600">Upload a skin image for AI analysis</p>
          </GlassCard>

          <GlassCard className="p-6 text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#088395]/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#088395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-[#088395] mb-2">Find Hospitals</h3>
            <p className="text-sm text-gray-600">Search for skin care hospitals near you</p>
          </GlassCard>

          <GlassCard className="p-6 text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#088395]/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#088395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-[#088395] mb-2">View History</h3>
            <p className="text-sm text-gray-600">Check your previous diagnoses</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;