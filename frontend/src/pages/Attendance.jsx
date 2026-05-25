import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [branch, setBranch] = useState("Computer Engineering");
  const [semester, setSemester] = useState(1);
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await api.get("/users/students");
        setStudents(res.data.filter(s => s.branch === branch && s.semester == semester));
      } catch (err) {
        console.error(err);
      }
    };
    loadStudents();
  }, [branch, semester]);

  const markAttendance = async (studentId) => {
    try {
      await api.post("/teacher/attendance", { student: studentId, status });
      alert("Attendance Saved!");
    } catch (err) {
      alert("Failed to save");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">Mark Attendance</h1>
      
      <div className="flex gap-4 mb-6">
        <select className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none" onChange={e => setBranch(e.target.value)}>
          <option>Computer Engineering</option>
          <option>Printing Technology</option>
          <option>Electrical Engineering</option>
        </select>
        <select className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none" onChange={e => setSemester(e.target.value)}>
          {[1,2,3,4,5,6].map(num => <option key={num} value={num}>Semester {num}</option>)}
        </select>
        <select className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none" onChange={e => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map(student => (
          <div key={student._id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white">{student.name}</h3>
              <p className="text-xs text-slate-400">{student.email}</p>
            </div>
            <button onClick={() => markAttendance(student._id)} className="bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm transition">
              Mark {status}
            </button>
          </div>
        ))}
        {students.length === 0 && <p className="text-slate-500 col-span-full">No students found for this branch and semester.</p>}
      </div>
    </div>
  );
}