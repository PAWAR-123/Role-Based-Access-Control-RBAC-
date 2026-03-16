import React, { useEffect, useState } from 'react';
import { userApi } from '../../services/userApi';
import { UserResponse } from '../../types/user.types';
import { useAuth } from '../../hooks/useAuth';

const UserContent: React.FC = () => {
  const { user } = useAuth();
  const [publicInfo, setPublicInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await userApi.getPublicInfo();
        setPublicInfo(info);
      } catch (error) {
        console.error('Error fetching public info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading user content...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">👤 User Content</h3>
      <p className="text-gray-700 mb-2">
        This content is visible only to users with the <span className="font-semibold">USER</span> role.
      </p>
      
      <div className="mt-4 border-t pt-4">
        <h4 className="font-semibold mb-2">Your Profile Information:</h4>
        <p><span className="font-medium">Name:</span> {user?.name}</p>
        <p><span className="font-medium">Email:</span> {user?.email}</p>
        <p><span className="font-medium">Role:</span> {user?.role}</p>
      </div>

      {publicInfo && (
        <div className="mt-4 bg-gray-50 rounded p-4">
          <h4 className="font-semibold mb-2">Public API Information:</h4>
          <p>App Name: {publicInfo.appName}</p>
          <p>Version: {publicInfo.version}</p>
          <p>{publicInfo.description}</p>
        </div>
      )}
    </div>
  );
};

export default UserContent;