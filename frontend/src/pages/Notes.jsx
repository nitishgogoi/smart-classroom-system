import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">Study Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <div key={note._id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-purple-500/50 transition-colors">
            <h2 className="text-xl font-bold text-purple-400 mb-2">{note.title}</h2>
            <p className="text-slate-400 text-sm">Subject: {note.subject}</p>
            <p className="text-slate-400 text-sm">Teacher: {note.teacher}</p>
            {note.file && (
              <a href={note.file} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm bg-purple-600/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-600/40 transition">
                View Document
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}