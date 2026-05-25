import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get("/assignments");
        setAssignments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">Assignments</h1>
      <div className="space-y-4">
        {assignments.map(a => (
          <div key={a._id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-indigo-400">{a.title}</h2>
              <p className="text-slate-400 text-sm mt-1">{a.description || "No description provided."}</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium transition">
              Submit Work
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}