import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaTimes, FaUserGraduate, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function TeacherStudents() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [branchFilter, setBranchFilter] = useState("Computer Engineering");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [stuRes, attRes, subRes] = await Promise.all([
        api.get("/users/students"),
        api.get("/attendance"),
        api.get("/submissions")
      ]);
      setStudents(stuRes.data);
      setAttendance(attRes.data || []);
      setSubmissions(subRes.data || []);
    } catch (err) {
      console.error("Failed to load student data", err);
    }
  };

  const filteredStudents = students.filter(s => s.branch === branchFilter);
  const studentAttendance = attendance.filter(a => a.student === selectedStudent?.name || a.student?._id === selectedStudent?._id);
  const studentSubmissions = submissions.filter(s => s.student === selectedStudent?.name || s.student?._id === selectedStudent?._id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Student Directory</h1>
          <p className="text-slate-400">Select a student to view their academic profile.</p>
        </div>
        <select 
          className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-indigo-500"
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
        >
          <option>Computer Engineering</option>
          <option>Electrical Engineering</option>
          <option>Printing Technology</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <div 
            key={student._id} 
            onClick={() => setSelectedStudent(student)}
            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xl font-bold">
              {student.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{student.name}</h2>
              <p className="text-slate-400 text-sm">Semester {student.semester}</p>
            </div>
          </div>
        ))}
        {filteredStudents.length === 0 && (
          <p className="text-slate-500 col-span-full py-10 text-center bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
            No students enrolled in this branch yet.
          </p>
        )}
      </div>

      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-600/30">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedStudent.name}</h2>
                  <p className="text-indigo-400 text-sm font-medium">{selectedStudent.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors">
                <FaTimes />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-slate-400 text-sm mb-1">Total Submissions</p>
                  <p className="text-3xl font-bold text-white">{studentSubmissions.length}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-slate-400 text-sm mb-1">Attendance Records</p>
                  <p className="text-3xl font-bold text-white">{studentAttendance.length}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><FaUserGraduate className="text-indigo-400"/> Assignments & Grades</h3>
                <div className="space-y-3">
                  {studentSubmissions.length > 0 ? studentSubmissions.map(sub => (
                    <div key={sub._id} className="flex justify-between items-center p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                      <div>
                        <p className="font-bold text-white">{sub.assignmentTitle || "Assignment"}</p>
                        <p className="text-xs text-slate-400 mt-1">Status: {sub.status}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${sub.marks ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                          {sub.marks ? `${sub.marks} Points` : 'Pending Grade'}
                        </span>
                      </div>
                    </div>
                  )) : <p className="text-slate-500 text-sm">No assignments submitted yet.</p>}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">Recent Attendance</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {studentAttendance.length > 0 ? studentAttendance.map((att, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
                      {att.status === "Present" ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                      <div>
                        <p className="text-sm font-bold text-white">{att.subject || "Class"}</p>
                        <p className="text-xs text-slate-400">{att.status}</p>
                      </div>
                    </div>
                  )) : <p className="text-slate-500 text-sm col-span-full">No attendance records found.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}