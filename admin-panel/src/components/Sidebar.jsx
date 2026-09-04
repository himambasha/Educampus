import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  GraduationCap, 
  Settings 
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Students', path: '/students', icon: GraduationCap },
    { label: 'Faculty', path: '/faculty', icon: Users },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Navigation Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-wide">Educampus</h1>
          <p className="text-xs text-slate-400 mt-1">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Page Area */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}