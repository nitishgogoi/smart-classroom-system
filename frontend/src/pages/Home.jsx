import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaChalkboardTeacher, FaBook, FaChartLine } from "react-icons/fa";

export default function Home() {
  // Animation variants for smooth staggered loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const features = [
    { title: "Smart Dashboards", icon: <FaChartLine />, desc: "Role-specific views for students and teachers to track real-time academic progress." },
    { title: "Attendance Tracking", icon: <FaChalkboardTeacher />, desc: "Seamlessly log, monitor, and visualize daily classroom attendance." },
    { title: "Digital Submissions", icon: <FaGraduationCap />, desc: "Upload assignments, track deadlines, and receive grades instantly." },
    { title: "Resource Hub", icon: <FaBook />, desc: "A centralized library for class notes, study materials, and important announcements." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden font-sans relative">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center max-w-7xl mx-auto px-6 py-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold">
          <span className="text-indigo-500">Smart</span>Class
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
          <Link to="/login" className="px-6 py-2 rounded-full text-slate-300 hover:text-white font-medium transition-colors">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all">
            Get Started
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-medium text-sm backdrop-blur-sm"
        >
          v2.0 Now Live for Nalbari Polytechnic
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-md"
        ></motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10"
        >
          A unified, intelligent platform designed to bridge the gap between educators and students. Manage attendance, track grades, and share resources effortlessly.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link to="/register" className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2">
            Create an Account
          </Link>
          <Link to="/login" className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg border border-slate-700 transition-all flex items-center justify-center gap-2">
            Teacher & Student Login
          </Link>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32 w-full text-left"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-3xl hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all group"
            >
              <div className="h-14 w-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

    </div>
  );
}