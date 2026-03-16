import React, { useEffect, useState } from 'react';
import { userApi } from '../../services/userApi';
import { UserResponse } from '../../types/user.types';

const AdminContent: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersData, dashboard] = await Promise.all([
          userApi.getAllUsers(),
          userApi.getAdminDashboard()
        ]);
        setUsers(usersData);
        setDashboardData(dashboard);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading admin content...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-purple-600 mb-4">👑 Admin Content</h3>
      <p className="text-gray-700 mb-2">
        This content is visible only to users with the <span className="font-semibold">ADMIN</span> role.
      </p>
      
      {dashboardData && (
        <div className="mt-4 bg-purple-50 rounded p-4">
          <h4 className="font-semibold mb-2">Admin Dashboard:</h4>
          <p>Total Users: {dashboardData.totalUsers}</p>
          <p>Admin Message: {dashboardData.adminMessage}</p>
        </div>
      )}

      <div className="mt-4">
        <h4 className="font-semibold mb-2">All Users ({users.length}):</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'ADMIN' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;