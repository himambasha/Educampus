import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/database/users')
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading database records...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">MongoDB User Records</h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3">ID</th>
              <th className="p-3">Email</th>
              <th className="p-3">Name</th>
              <th className="p-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-xs text-gray-500">{u.id}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.name || 'N/A'}</td>
                <td className="p-3">{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}