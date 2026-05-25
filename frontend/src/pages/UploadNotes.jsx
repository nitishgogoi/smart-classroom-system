import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UploadNotes() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", subject: "", branch: "", semester: "", file: "" });

  async function upload(e) {
    e.preventDefault();
    try {
      await api.post("/teacher/notes", { ...form, teacher: user.name });
      alert("Uploaded Successfully");
      navigate("/teacher/notes");
    } catch {
      alert("Upload failed");
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 bg-slate-900 p-8 rounded-3xl border border-slate-800">
      <h1 className="text-3xl font-bold text-white">Upload Notes</h1>
      <form onSubmit={upload} className="space-y-4">
        <input required placeholder="Title" className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-indigo-500" onChange={e => setForm({...form, title: e.target.value})} />
        <input required placeholder="Subject (e.g., DBMS)" className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-indigo-500" onChange={e => setForm({...form, subject: e.target.value})} />
        <input placeholder="File Link (URL)" className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-indigo-500" onChange={e => setForm({...form, file: e.target.value})} />
        <button type="submit" className="w-full p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition">Upload to Classroom</button>
      </form>
    </div>
  );
}