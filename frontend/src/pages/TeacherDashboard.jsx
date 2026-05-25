import axios from "axios";
import {useEffect,useState}
from "react";

import "./TeacherDashboard.css";

function TeacherDashboard(){

const [tab,setTab]=
useState("students");

const [students,setStudents]=
useState([]);

const [title,setTitle]=
useState("");

const [notes,setNotes]=
useState("");

const [attendance,setAttendance]=
useState("");



useEffect(()=>{

loadStudents();

},[]);



async function loadStudents(){

let res=
await axios.get(
"https://smart-classroom-system-23f9.onrender.com/api/users/students"
);

setStudents(
res.data
);

}



async function createAssignment(){

await axios.post(
"https://smart-classroom-system-23f9.onrender.com/api/teacher/assignment",

{
title
}

);

alert(
"Assignment created"
);

}



async function uploadNotes(){

await axios.post(
"https://smart-classroom-system-23f9.onrender.com/api/teacher/notes",

{
title:notes
}

);

alert(
"Notes uploaded"
);

}



async function markAttendance(){

await axios.post(
"https://smart-classroom-system-23f9.onrender.com/api/teacher/attendance",

{

student:attendance,

status:"Present"

}

);

alert(
"Attendance saved"
);

}



return(

<div className="teacher">

<div className="sidebar">

<button
onClick={()=>setTab("students")}
>

Students

</button>


<button
onClick={()=>setTab("assignment")}
>

Assignments

</button>


<button
onClick={()=>setTab("attendance")}
>

Attendance

</button>


<button
onClick={()=>setTab("notes")}
>

Notes

</button>

</div>



<div className="content">

<h1>
Teacher Dashboard
</h1>



{

tab==="students"

&&

students.map(s=>(

<div
className="card"
>

<h3>
{s.name}
</h3>

<p>
{s.branch}
</p>

<p>
Semester:
{s.semester}
</p>

</div>

))

}



{

tab==="assignment"

&&

<div>

<input

placeholder=
"Assignment"

onChange={(e)=>

setTitle(
e.target.value
)

}

/>


<button

onClick={
createAssignment
}

>

Create Assignment

</button>

</div>

}



{

tab==="attendance"

&&

<div>

<input

placeholder=
"Student"

onChange={(e)=>

setAttendance(
e.target.value
)

}

/>

<button

onClick={
markAttendance
}

>

Mark Attendance

</button>

</div>

}



{

tab==="notes"

&&

<div>

<input

placeholder=
"Notes"

onChange={(e)=>

setNotes(
e.target.value
)

}

/>


<button

onClick={
uploadNotes
}

>

Upload Notes

</button>

</div>

}


</div>

</div>

);

}

export default TeacherDashboard;