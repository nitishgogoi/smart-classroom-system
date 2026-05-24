import {

BrowserRouter,
Routes,
Route

}

from "react-router-dom";

import Login
from "./pages/Login";

import UploadNotes
from "./pages/UploadNotes";

import Register
from "./pages/Register";

import TeacherDashboard
from "./pages/TeacherDashboard";

import StudentDashboard
from "./pages/StudentDashboard";

import Attendance
from "./pages/Attendance";

import Assignments
from "./pages/Assignments";

import Notes
from "./pages/Notes";

import Grades
from "./pages/Grades";

import ProtectedRoute

from "./components/ProtectedRoute";

import Subjects
from "./pages/Subjects";

import SubmitAssignment
from "./pages/SubmitAssignment";



function App(){

return(

<BrowserRouter>

<Routes>



<Route

path="/"

element={<Login/>}

/>

<Route

path="/upload-notes"

element={
<UploadNotes/>
}

/>



<Route

path="/register"

element={<Register/>}

/>



<Route

path="/teacher"

element={

<ProtectedRoute
role="teacher"
>

<TeacherDashboard/>

</ProtectedRoute>

}

/>




<Route

path="/student"

element={

<ProtectedRoute
role="student"
>

<StudentDashboard/>

</ProtectedRoute>

}

/>



<Route

path="/attendance"

element={<Attendance/>}

/>



<Route

path="/assignments"

element={<Assignments/>}

/>

<Route
path="/submit-assignment"
element={<SubmitAssignment/>}
/>



<Route

path="/notes"

element={<Notes/>}

/>



<Route

path="/grades"

element={<Grades/>}

/>

<Route

path="/subjects"

element={<Subjects/>}

/>



</Routes>

</BrowserRouter>

)

}

export default App;