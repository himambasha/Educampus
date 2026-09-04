import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/user');
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching MongoDB records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      const res = await axios.post('http://localhost:5000/api/user', { name, email });
      if (res.data.success) {
        setName('');
        setEmail('');
        fetchUsers(); // Reload table from database
      }
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Database Inspector — Users Collection</h1>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
        >
          Refresh Data
        </button>
      </div>

      {/* Add Record Form */}
      <form onSubmit={handleAddUser} className="bg-white p-4 rounded-lg shadow flex gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-1/3 text-sm"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-1/3 text-sm"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700"
        >
          Add Record to MongoDB
        </button>
      </form>

      {/* Database Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Connecting to database...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No records found in MongoDB collection.</div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs text-gray-700 uppercase border-b">
              <tr>
                <th className="px-6 py-3">MongoDB Object ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs text-indigo-600">{user.id}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{new Date(user.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}