import { useEffect, useState } from "react";
import axios from "axios";
import "./TeacherDashboard.css";

function TeacherDashboard(){

const [students,setStudents]=useState([]);
const [tab,setTab]=useState("students");

useEffect(()=>{

getStudents();

},[]);


const getStudents = async()=>{

try{

const res =
await axios.get(
"https://smart-classroom-system-23f9.onrender.com/api/users/students"
);

setStudents(res.data);

}

catch(err){

console.log(err);

}

};


return(

<div className="teacher">

<div className="sidebar">

<h2>Teacher</h2>

<button onClick={()=>setTab("students")}>
Students
</button>

<button onClick={()=>setTab("assignments")}>
Assignments
</button>

<button onClick={()=>setTab("attendance")}>
Attendance
</button>

<button onClick={()=>setTab("notes")}>
Notes
</button>

<button
className="logout"
onClick={()=>window.location="/"}
>
Logout
</button>

</div>


<div className="content">

<h1>Teacher Dashboard</h1>


<div className="cards">

<div className="card blue">
Students
<br/>
{students.length}
</div>

<div className="card green">
Assignments
</div>

<div className="card purple">
Attendance
</div>

<div className="card orange">
Notes
</div>

</div>



{
tab==="students" && (

<div>

<h2>Students</h2>

{
students.map((s)=>(

<div
key={s._id}
className="studentCard"
>

<h3>{s.name}</h3>

<p>{s.email}</p>

<p>
Branch:
{s.branch}
</p>

<p>
Semester:
{s.semester}
</p>

</div>

))
}

</div>

)
}



{
tab==="assignments" && (

<div className="box">

<h2>Assignments</h2>

<button>
Create Assignment
</button>

</div>

)
}



{
tab==="attendance" && (

<div className="box">

<h2>Attendance</h2>

<button>
Mark Attendance
</button>

</div>

)
}



{
tab==="notes" && (

<div className="box">

<h2>Notes</h2>

<button>
Upload Notes
</button>

</div>

)
}



</div>

</div>

);

}

export default TeacherDashboard;