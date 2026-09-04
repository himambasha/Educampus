import React, { useEffect, useState } from 'react';
import UsersPage from './pages/Users';
import { 
  Users as UsersIcon, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  LayoutDashboard,
  Settings,
  Bell,
  Search
} from 'lucide-react';
import api from './api/axios';

export default function App() {
  const [status, setStatus] = useState('Connecting to server...');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    api.get('/health')
      .then((res) => {
        if (res.data.success || res.data.message) {
          setStatus(res.data.message || 'API Server Operational');
          setIsConnected(true);
        }
      })
      .catch(() => {
        setStatus('Failed to connect to backend.');
        setIsConnected(false);
      });
  }, []);

  const stats = [
    { title: 'Total Students', count: '1,280', icon: GraduationCap, change: '+12%' },
    { title: 'Active Courses', count: '36', icon: BookOpen, change: '+4%' },
    { title: 'Faculty Members', count: '84', icon: UsersIcon, change: '+2%' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-wide">Educampus</h1>
          <p className="text-xs text-slate-400 mt-1">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-indigo-600 text-white">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
            <BookOpen className="w-5 h-5" />
            Courses
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
            <GraduationCap className="w-5 h-5" />
            Students
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
            <UsersIcon className="w-5 h-5" />
            Faculty
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-slate-700 rounded-lg bg-slate-50 border border-slate-200">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                AD
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Admin User</p>
                <p className="text-xs text-slate-500">admin@educampus.edu</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          {/* Header with Backend Status Badge */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Dashboard</h1>
              <p className="text-slate-500 text-sm mt-1">Welcome back, Admin. Here is an overview of Educampus.</p>
            </div>

            {/* Status Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border shadow-sm ${
              isConnected 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {isConnected ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 animate-pulse" />
              )}
              <span>{status}</span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.count}</h3>
                    <span className="inline-flex items-center text-xs font-medium text-emerald-600 mt-2">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                      {stat.change} from last month
                    </span>
                  </div>
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* System Status Container */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Live Server Connection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-xs font-medium uppercase tracking-wider mb-1">Backend API Status</span>
                <span className="text-slate-800 font-medium font-mono text-xs">{status}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-xs font-medium uppercase tracking-wider mb-1">Database Provider</span>
                <span className="text-slate-800 font-medium">MongoDB Community / Mongoose</span>
              </div>
            </div>
          </div>

          {/* Users Table Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <UsersPage />
          </div>
        </div>
      </main>
    </div>
  );
}