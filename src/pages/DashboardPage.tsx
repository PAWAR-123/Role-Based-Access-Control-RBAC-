import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import UserContent from '../components/dashboard/UserContent';
import AdminContent from '../components/dashboard/AdminContent';
import Navbar from '../components/common/Navbar';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, isUser, user, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name}! You are logged in as{' '}
            <span className={`font-semibold ${
              user?.role === 'ADMIN' ? 'text-purple-600' : 'text-blue-600'
            }`}>
              {user?.role}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* User Content Card - Visible for USER role */}
          {isUser && (
            <div className="border-2 border-blue-200 rounded-lg overflow-hidden">
              <UserContent />
            </div>
          )}

          {/* Admin Content Card - Visible for ADMIN role */}
          {isAdmin && (
            <div className="border-2 border-purple-200 rounded-lg overflow-hidden">
              <AdminContent />
            </div>
          )}

          {/* Additional Information Card */}
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">📋 Session Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border">
                <p className="text-sm text-gray-600">Authentication Status</p>
                <p className="font-semibold text-green-600">Authenticated</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="text-sm text-gray-600">Your Role</p>
                <p className={`font-semibold ${
                  user?.role === 'ADMIN' ? 'text-purple-600' : 'text-blue-600'
                }`}>
                  {user?.role}
                </p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="text-sm text-gray-600">Access Level</p>
                <p className="font-semibold text-gray-700">
                  {isAdmin ? 'Full Access (Admin)' : 'Limited Access (User)'}
                </p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="text-sm text-gray-600">Session Token</p>
                <p className="font-semibold text-gray-700">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;