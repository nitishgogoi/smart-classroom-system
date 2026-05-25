import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

// Public Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboards
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

// Shared & Sub-pages
import Subjects from "./pages/Subjects";
import Notes from "./pages/Notes";
import Assignments from "./pages/Assignments";
import Submissions from "./pages/Submissions";
import UploadNotes from "./pages/UploadNotes";
import StudentAssignments from "./pages/StudentAssignments";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import TeacherStudents from "./pages/TeacherStudents"; // <-- NEW IMPORT

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🎓 STUDENT ROUTES */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<StudentDashboard />} />
            <Route path="classes" element={<Subjects />} />
            <Route path="notes" element={<Notes />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="grades" element={<Grades />} />
          </Route>

          {/* 👨‍🏫 TEACHER ROUTES */}
          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['teacher', 'admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<TeacherDashboard />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="notes" element={<Notes />} />
            <Route path="upload-notes" element={<UploadNotes />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="students" element={<TeacherStudents />} /> {/* <-- NEW ROUTE */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App; 