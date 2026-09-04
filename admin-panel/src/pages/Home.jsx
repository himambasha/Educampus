import React from 'react';
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  FileText 
} from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'Active Students', value: '10,000+', icon: Users },
    { label: 'Expert Faculty', value: '250+', icon: GraduationCap },
    { label: 'Courses Offered', value: '120+', icon: BookOpen },
    { label: 'Placement Rate', value: '95%', icon: Award },
  ];

  const features = [
    {
      title: 'Course Management',
      description: 'Access complete session plans, syllabi, and study materials seamlessly.',
      icon: BookOpen,
    },
    {
      title: 'Attendance & Tracking',
      description: 'Real-time attendance recording and automated academic reports.',
      icon: Calendar,
    },
    {
      title: 'Assignments & Exams',
      description: 'Online submission system with instant grading and teacher feedback.',
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 md:w-1/2">
            <span className="inline-block px-3 py-1 bg-blue-700/50 text-blue-200 text-sm font-semibold rounded-full border border-blue-500/30">
              Next-Gen Academic Platform
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Empowering Education with <span className="text-blue-400">Educampus</span>
            </h1>
            <p className="text-lg text-slate-200">
              A unified platform for students, faculty, and administrators to streamline learning, tracking, and campus management.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/login"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition shadow-lg shadow-blue-500/25"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#features"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg border border-white/20 transition"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-white/10 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <div>
                    <p className="font-semibold text-sm">Interactive Learning</p>
                    <p className="text-xs text-slate-300">Access unit notes & lab exercises</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/10 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <div>
                    <p className="font-semibold text-sm">Automated Grading</p>
                    <p className="text-xs text-slate-300">Instant MCQs and submission evaluations</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/10 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <div>
                    <p className="font-semibold text-sm">Role-Based Portals</p>
                    <p className="text-xs text-slate-300">Customized views for Admin, Faculty, and Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-10 shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">Everything You Need to Succeed</h2>
          <p className="text-slate-600">
            Comprehensive tools designed to manage academic operations, student performance, and coursework effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Transform Campus Management?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Log in to your account to manage curricula, check schedules, or view assignment deadlines.
          </p>
          <div className="pt-2">
            <a
              href="/login"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3 rounded-lg transition"
            >
              Sign In to Dashboard <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}