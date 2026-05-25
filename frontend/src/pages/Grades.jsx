import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Grades() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const loadGrades = async () => {
      try {
        const res = await api.get("/grades");
        setGrades(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadGrades();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">My Grades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {grades.map(g => (
          <div key={g._id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-indigo-400">{g.subject?.name || "Unknown Subject"}</h2>
              <p className="text-slate-400 text-sm mt-1">Total Score</p>
            </div>
            <div className="text-3xl font-black text-white bg-slate-800 h-16 w-16 flex items-center justify-center rounded-full border border-slate-700">
              {g.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}