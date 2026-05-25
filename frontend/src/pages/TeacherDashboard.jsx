import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function TeacherDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ students: 0, classes: 0 });

  useEffect(() => {
    // A real app would fetch stats here, we will mock it based on your old code
    setStats({ students: 120, classes: 5 });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Teacher Overview</h1>
        <p className="text-slate-400">Welcome, Professor {user?.name}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl shadow-lg border border-indigo-500/30">
          <h3 className="text-indigo-100 font-medium">Total Students</h3>
          <p className="text-4xl font-bold text-white mt-2">{stats.students}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-fuchsia-700 p-6 rounded-2xl shadow-lg border border-purple-500/30">
          <h3 className="text-purple-100 font-medium">Active Classes</h3>
          <p className="text-4xl font-bold text-white mt-2">{stats.classes}</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/teacher/assignments" className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center hover:bg-slate-800 transition-colors text-slate-300 font-medium">
            + Create Assignment
          </Link>
          <Link to="/teacher/attendance" className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center hover:bg-slate-800 transition-colors text-slate-300 font-medium">
            ✓ Mark Attendance
          </Link>
          <Link to="/teacher/notes" className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center hover:bg-slate-800 transition-colors text-slate-300 font-medium">
            📁 Upload Notes
          </Link>
        </div>
      </div>
    </div>
  );
}