import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaGraduationCap, FaBook, FaCalendarAlt } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    branch: "Computer Engineering",
    semester: 1
  });

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      };

      /* only students need branch+semester */
      if (form.role === "student") {
        payload.branch = form.branch;
        payload.semester = Number(form.semester);
      }

      await axios.post(
        "https://smart-classroom-system-23f9.onrender.com/api/auth/register",
        payload
      );

      // FIXED: Send them to the login page after registering!
      navigate("/login"); 
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center relative overflow-hidden font-sans p-4">
      
      {/* Background Glow Effects (Matches Home page) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-3xl w-full max-w-[450px] shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join the SmartClass platform today.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          
          {/* Name Input */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              name="name"
              placeholder="Full Name"
              onChange={change}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={change}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={change}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Role Select */}
          <div className="relative">
            <FaGraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              name="role"
              onChange={change}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
            >
              <option value="student">Student Account</option>
              <option value="teacher">Teacher Account</option>
            </select>
          </div>

          {/* Conditional Student Fields */}
          {form.role === "student" && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4 pt-2"
            >
              <div className="relative">
                <FaBook className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <select
                  name="branch"
                  onChange={change}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  <option>Computer Engineering</option>
                  <option>Printing Technology</option>
                  <option>Electrical Engineering</option>
                </select>
              </div>

              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <select
                  name="semester"
                  onChange={change}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>Semester {num}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all transform active:scale-[0.98] mt-4"
          >
            Create Account
          </button>
        </form>

        {/* FIXED: Link back to the specific /login route */}
        <div className="mt-6 text-center">
          <p className="text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-all">
              Login here
            </Link>
          </p>
        </div>
        
      </motion.div>
    </div>
  );
}