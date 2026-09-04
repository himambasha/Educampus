import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/admin/database';

export default function DatabaseViewer() {
  const [stats, setStats] = useState([]);
  const [selectedModel, setSelectedModel] = useState('User');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchRecords(selectedModel);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE}/stats`);
      if (res.data.success) setStats(res.data.data);
    } catch (err) {
      console.error('Failed to load database stats', err);
    }
  };

  const fetchRecords = async (model) => {
    setLoading(true);
    setSelectedModel(model);
    try {
      const res = await axios.get(`${API_BASE}/model/${model.toLowerCase()}`);
      if (res.data.success) setRecords(res.data.data);
    } catch (err) {
      console.error('Failed to fetch records', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Database Inspector</h1>

      {/* Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((item) => (
          <div
            key={item.model}
            onClick={() => fetchRecords(item.model)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedModel === item.model
                ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <h3 className="font-semibold text-gray-700">{item.model} Collection</h3>
            <p className="text-2xl font-bold text-indigo-600">{item.count} Records</p>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{selectedModel} Records</h2>
          <button
            onClick={() => fetchRecords(selectedModel)}
            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
          >
            Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading records...</div>
        ) : records.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No records found in this collection.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase border-b">
                <tr>
                  {Object.keys(records[0] || {}).map((key) => (
                    <th key={key} className="px-6 py-3">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((row, idx) => (
                  <tr key={row.id || idx} className="border-b hover:bg-gray-50">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="px-6 py-4 whitespace-nowrap">
                        {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}