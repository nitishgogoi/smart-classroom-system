import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboards
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

// Other Pages (Make sure these exist or create them later)
import Notes from "./pages/Notes";
import Subjects from "./pages/Subjects";
import Assignments from "./pages/Assignments";
import Submissions from "./pages/Submissions";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🎓 STUDENT ROUTES (Wrapped in DashboardLayout) */}
        <Route path="/student" element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<StudentDashboard />} />
          <Route path="classes" element={<Subjects />} />
          <Route path="notes" element={<Notes />} />
          {/* We'll add the others as we fix them */}
        </Route>

        {/* 👨‍🏫 TEACHER ROUTES (Wrapped in DashboardLayout) */}
        <Route path="/teacher" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<TeacherDashboard />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="attendance" element={<Submissions />} />
          {/* We'll add the others as we fix them */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;