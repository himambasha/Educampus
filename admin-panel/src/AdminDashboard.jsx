import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  HelpCircle, 
  CreditCard, 
  FileText, 
  Settings, 
  Search, 
  Bell, 
  Activity, 
  BarChart3, 
  Layers, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Upload 
} from 'lucide-react';

export default function QuizMasterDashboard() {
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Civil Services',
    price: '10.00',
    totalQuestions: '10',
    passingPercentage: '60',
    perQuestionTimeSecs: '30',
    timerType: 'overall'
  });

  // Exams Table State
  const [exams, setExams] = useState([
    { id: 1, title: 'UPSC Prelims Mock 2024', price: '10.00', limit: 10, timerType: 'Question Timer', status: 'Active' },
    { id: 2, title: 'UPSC Prelims Mock 2024', price: '10.00', limit: 10, timerType: 'Question Timer', status: 'Draft' },
    { id: 3, title: 'UPSC Prelims Mock 2024', price: '10.00', limit: 10, timerType: 'Question Timer', status: 'Active' },
    { id: 4, title: 'UPSC Prelims Mock 2024', price: '10.00', limit: 30, timerType: 'Question Timer', status: 'Active' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateExam = (e) => {
    e.preventDefault();
    if (!formData.title) return alert('Please enter an exam title');

    const newExam = {
      id: Date.now(),
      title: formData.title,
      price: formData.price,
      limit: Number(formData.totalQuestions),
      timerType: formData.timerType === 'overall' ? 'Overall Timer' : 'Question Timer',
      status: 'Active'
    };

    setExams([newExam, ...exams]);
    setFormData({
      title: '',
      category: 'Civil Services',
      price: '10.00',
      totalQuestions: '10',
      passingPercentage: '60',
      perQuestionTimeSecs: '30',
      timerType: 'overall'
    });
  };

  const handleDelete = (id) => {
    setExams(exams.filter((exam) => exam.id !== id));
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 font-sans">
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4 shadow-xl">
        <div>
          {/* Logo Header */}
          <div className="flex items-center space-x-3 mb-8 px-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">QUIZ MASTER</h1>
              <p className="text-xs text-slate-400">ADMIN PANEL - Exam Engine Config</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <a href="#dashboard" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white font-medium">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#users" className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-800 transition">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5" />
                <span>Users & Activity</span>
              </div>
            </a>
            <a href="#exams" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition">
              <BookOpen className="w-5 h-5" />
              <span>Exams & Bundles</span>
            </a>
            <a href="#questions" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition">
              <HelpCircle className="w-5 h-5" />
              <span>Question Bank</span>
            </a>
            <a href="#finance" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition">
              <CreditCard className="w-5 h-5" />
              <span>Subscriptions & Finance</span>
            </a>
            <a href="#cms" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition">
              <FileText className="w-5 h-5" />
              <span>Content (CMS/Feedback)</span>
            </a>
            <a href="#settings" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition">
              <Settings className="w-5 h-5" />
              <span>System Settings</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        {/* Top App Bar */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Welcome, Super Admin</h2>
          
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-4 py-1.5 bg-slate-100 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-slate-700">Profile</span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* Section: Overview Metrics */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Exam Bundles Overview</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Recent Activity</p>
                  <p className="text-2xl font-bold text-slate-800">132</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium font-medium">Questions</p>
                  <p className="text-2xl font-bold text-slate-800">21</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Recent Activity</p>
                  <p className="text-2xl font-bold text-slate-800">5</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg text-amber-600">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Questlions</p>
                  <p className="text-2xl font-bold text-slate-800">53</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Two-Column Control Panel */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column: Create Exam Form */}
            <div className="col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-slate-800">Set Up New Exam/Bundle</h4>
                <button onClick={handleCreateExam} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition">
                  Publish Exam
                </button>
              </div>

              <form onSubmit={handleCreateExam} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Exam Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="UPSC Prelims Mock 2024"
                      className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Exam Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option>Civil Services</option>
                      <option>Engineering</option>
                      <option>Banking</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Pricing (INR)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Total Question Limit</label>
                    <select
                      name="totalQuestions"
                      value={formData.totalQuestions}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="10">10 Questions</option>
                      <option value="25">25 Questions</option>
                      <option value="50">50 Questions</option>
                      <option value="100">100 Questions</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Passing Marks (%)</label>
                    <input
                      type="number"
                      name="passingPercentage"
                      value={formData.passingPercentage}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Per Question Time (secs)</label>
                    <input
                      type="number"
                      name="perQuestionTimeSecs"
                      value={formData.perQuestionTimeSecs}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Radio Timer Options */}
                <div className="flex items-center space-x-6 pt-2 text-xs font-medium text-slate-700">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="timerType"
                      value="overall"
                      checked={formData.timerType === 'overall'}
                      onChange={handleChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Per Exam Overall Timer</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="timerType"
                      value="per_question"
                      checked={formData.timerType === 'per_question'}
                      onChange={handleChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Per Question Timer</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">
                    Publish Exam
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Manage Current Exams Table */}
            <div className="col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-800">Manage Current Exams & Pricing</h4>
                  <button className="border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs px-3 py-1.5 rounded-lg font-medium">
                    Save Draft
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                        <th className="py-2">Title</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Qs Limit</th>
                        <th className="py-2">Timer Type</th>
                        <th className="py-2">Status</th>
                        <th className="py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {exams.map((exam) => (
                        <tr key={exam.id} className="hover:bg-slate-50">
                          <td className="py-2.5 font-medium">{exam.title}</td>
                          <td className="py-2.5">{exam.price}</td>
                          <td className="py-2.5">{exam.limit}</td>
                          <td className="py-2.5">{exam.timerType}</td>
                          <td className="py-2.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                exam.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {exam.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-right space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                            <button onClick={() => handleDelete(exam.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-slate-100">
                <button className="px-4 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">
                  Save Draft
                </button>
                <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">
                  Configure
                </button>
              </div>
            </div>
          </div>

          {/* Section: Question Pool Mapping & Bank Status */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800">Question Pool Mapping</h4>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium flex items-center space-x-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Questions</span>
                </button>
              </div>
              <p className="text-xs text-slate-500">Select questions from the Question Pro Question Bank.</p>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Select Question Bank</label>
                    <select className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>Select Question Bank</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Randomization</label>
                    <select className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>Question Pool</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-medium text-slate-700">
                  <label className="block text-slate-600 font-semibold mb-1">Configure options</label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="pool" className="text-blue-600" />
                    <span>Randomization for randomization</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="pool" defaultChecked className="text-blue-600" />
                    <span>Dynamic Pooling for randomin Pooling</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="pool" className="text-blue-600" />
                    <span>Dynamic Pooling - Dynamic Pooling</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Stat Widget */}
            <div className="col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-800 mb-4">Question Bank Status</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Total Questions</span>
                    <span className="font-bold text-slate-800">120</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Categories</span>
                    <span className="font-bold text-slate-800">18</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Compoisled</span>
                    <span className="font-bold text-slate-800">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}