import { useContext, useState, useEffect } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  // Auto-close sidebar on mobile when changing pages
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const links = user?.role === "teacher" || user?.role === "admin" ? [
    { name: "Dashboard", path: "/teacher", icon: <FaHome /> },
    { name: "Assignments", path: "/teacher/assignments", icon: <FaClipboardList /> },
    { name: "Attendance", path: "/teacher/attendance", icon: <FaBell /> },
    { name: "Notes", path: "/teacher/notes", icon: <FaStickyNote /> },
    { name: "Students", path: "/teacher/students", icon: <FaUserGraduate /> },
  ] : [
    { name: "Dashboard", path: "/student", icon: <FaHome /> },
    { name: "My Classes", path: "/student/classes", icon: <FaBook /> },
    { name: "Assignments", path: "/student/assignments", icon: <FaClipboardList /> },
    { name: "Grades", path: "/student/grades", icon: <FaUserGraduate /> },
    { name: "Notes", path: "/student/notes", icon: <FaStickyNote /> },
  ];

  return (
    <div className="h-screen bg-slate-950 text-white flex overflow-hidden font-sans relative">
      
      {/* MOBILE OVERLAY (Darkens background when menu is open on phones) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className={`bg-slate-900 border-r border-slate-800 flex flex-col z-50 shrink-0 absolute md:relative h-full transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-20 flex items-center justify-center border-b border-slate-800 shrink-0">
          <h1 className={`font-bold text-xl text-indigo-400 whitespace-nowrap transition-opacity ${!isSidebarOpen && "md:opacity-0 md:hidden"}`}>
            Smart<span className="text-white">Class</span>
          </h1>
          {!isSidebarOpen && <FaUserGraduate className="text-2xl text-indigo-400 hidden md:block" />}
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2 overflow-x-hidden">
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
                {/* On mobile, text always shows if open. On desktop, text hides when collapsed */}
                <span className={`ml-4 font-medium whitespace-nowrap ${!isSidebarOpen && "md:hidden"}`}>
                  {link.name}
                </span>
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
            <span className={`ml-4 font-medium whitespace-nowrap ${!isSidebarOpen && "md:hidden"}`}>
              Logout
            </span>
          </button>
        </div>
      </motion.aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        
        {/* TOP NAVBAR */}
        <header className="h-20 shrink-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 md:px-6 z-10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="text-slate-400 hover:text-white transition-colors p-2"
          >
            <FaBars className="text-2xl" />
          </button>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{user?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role} {user?.branch && `• ${user.branch}`}</p>
            </div>
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* DYNAMIC PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] bg-indigo-600/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none"></div>
          
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