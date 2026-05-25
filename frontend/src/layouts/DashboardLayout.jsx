import { useContext, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { 
  FaBook, FaBell, FaClipboardList, FaStickyNote, 
  FaUserGraduate, FaSignOutAlt, FaBars, FaHome
} from "react-icons/fa";

export default function DashboardLayout() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dynamic links based on user role
  const links = user?.role === "teacher" || user?.role === "admin" ? [
    { name: "Dashboard", path: "/teacher", icon: <FaHome /> },
    { name: "Assignments", path: "/teacher/assignments", icon: <FaClipboardList /> },
    { name: "Attendance", path: "/teacher/attendance", icon: <FaBell /> },
    { name: "Notes", path: "/teacher/notes", icon: <FaStickyNote /> },
    { name: "Students", path: "/teacher/students", icon: <FaUserGraduate /> }, // <-- THIS IS THE NEW LINK!
  ] : [
    { name: "Dashboard", path: "/student", icon: <FaHome /> },
    { name: "My Classes", path: "/student/classes", icon: <FaBook /> },
    { name: "Assignments", path: "/student/assignments", icon: <FaClipboardList /> },
    { name: "Grades", path: "/student/grades", icon: <FaUserGraduate /> },
    { name: "Notes", path: "/student/notes", icon: <FaStickyNote /> },
  ];

  return (
    <div className="h-screen bg-slate-950 text-white flex overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <motion.aside 
        initial={{ width: 260 }}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex z-20 shrink-0"
      >
        <div className="h-20 flex items-center justify-center border-b border-slate-800 shrink-0">
          <h1 className={`font-bold text-xl text-indigo-400 whitespace-nowrap transition-opacity ${!isSidebarOpen && "opacity-0 hidden"}`}>
            Smart<span className="text-white">Class</span>
          </h1>
          {!isSidebarOpen && <FaUserGraduate className="text-2xl text-indigo-400" />}
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`flex items-center p-3 rounded-xl transition-all ${
                  isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
                title={link.name}
              >
                <span className="text-lg shrink-0">{link.icon}</span>
                {isSidebarOpen && <span className="ml-4 font-medium whitespace-nowrap">{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 shrink-0">
          <button 
            onClick={logout}
            className="flex items-center w-full p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all overflow-hidden"
          >
            <FaSignOutAlt className="text-lg shrink-0" />
            {isSidebarOpen && <span className="ml-4 font-medium whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* TOP NAVBAR */}
        <header className="h-20 shrink-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 z-10">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white transition-colors">
            <FaBars className="text-2xl" />
          </button>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{user?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role} {user?.branch && `• ${user.branch}`}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* DYNAMIC PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 max-w-7xl mx-auto h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}