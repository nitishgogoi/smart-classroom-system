import { useEffect, useState, useContext } from "react";
import api from "../api/axios"; // Use the central API client
import { AuthContext } from "../context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function StudentDashboard() {
  const { user } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (user) {
      loadAll(user.branch, user.semester);
    }
  }, [user]);

  async function loadAll(branch, semester) {
    try {
      const sub = await api.get(`/subjects?branch=${branch}&semester=${semester}`);
      const nts = await api.get("/notes");
      const asn = await api.get("/assignments");

      setSubjects(sub.data);
      setNotes(nts.data);
      setAssignments(asn.data);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    }
  }

  // Dummy attendance data for the chart
  const attendanceData = [
    { name: "Present", value: 75 },
    { name: "Absent", value: 25 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Student Dashboard</h1>
          <p className="text-slate-400">Welcome back, {user?.name}. Here is your overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* STATS CARDS */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          <Card title="My Subjects" count={subjects.length} color="bg-blue-500/10 text-blue-400 border-blue-500/20" />
          <Card title="Pending Assignments" count={assignments.length} color="bg-orange-500/10 text-orange-400 border-orange-500/20" />
          <Card title="Study Notes" count={notes.length} color="bg-purple-500/10 text-purple-400 border-purple-500/20" />
          <Card title="Avg Grade" count="A-" color="bg-green-500/10 text-green-400 border-green-500/20" />
        </div>

        {/* ATTENDANCE CHART */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-slate-300 mb-4">Overall Attendance</h3>
          <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attendanceData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  <Cell fill="#4f46e5" /> {/* Indigo for Present */}
                  <Cell fill="#ef4444" /> {/* Red for Absent */}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-500"></span> Present</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Absent</span>
          </div>
        </div>
      </div>

      {/* QUICK LISTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Section title="Recent Assignments" data={assignments} field="title" />
         <Section title="Latest Notes" data={notes} field="title" />
      </div>
    </div>
  );
}

// Reusable Components tailored for Tailwind
function Card({ title, count, color }) {
  return (
    <div className={`p-6 rounded-2xl border ${color} flex flex-col justify-between`}>
      <h3 className="text-sm font-medium opacity-80">{title}</h3>
      <p className="text-4xl font-bold mt-2">{count}</p>
    </div>
  );
}

function Section({ title, data, field }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      {data.length === 0 ? (
        <p className="text-slate-400 text-sm">Nothing to show right now.</p>
      ) : (
        <ul className="space-y-3">
          {data.slice(0, 5).map((item, idx) => (
            <li key={idx} className="p-3 bg-slate-800/50 rounded-xl text-slate-300 flex justify-between items-center">
              <span>{item[field]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}