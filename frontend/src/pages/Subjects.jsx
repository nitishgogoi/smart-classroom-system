import { useEffect, useState } from "react";
import api from "../api/axios"; // Important: Use the central API

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">My Subjects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((s) => (
          <div key={s._id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-colors">
            <h2 className="text-xl font-bold text-indigo-400 mb-2">{s.name}</h2>
            <p className="text-slate-400 text-sm mb-1">Code: {s.code}</p>
            <p className="text-slate-400 text-sm mb-1">Branch: {s.branch}</p>
            <p className="text-slate-400 text-sm">Semester: {s.semester}</p>
          </div>
        ))}
      </div>
    </div>
  );
}