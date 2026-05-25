import { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherDashboard(){

const [students,setStudents]=useState([]);
const [teacher,setTeacher]=useState(null);

useEffect(()=>{

const email =
localStorage.getItem("email");

axios.get(
"https://smart-classroom-system-23f9.onrender.com/api/users/teachers"
)
.then(res=>{

const t =
res.data.find(
x=>x.email===email
);

setTeacher(t);

if(t){

axios.get(
`https://smart-classroom-system-23f9.onrender.com/api/users/students`
)
.then(r=>{

const filtered=
r.data.filter(

s=>
s.branch===t.branch &&
Number(s.semester)===Number(t.semester)

);

setStudents(filtered);

});

}

});

},[]);


return(

<div style={{
padding:"30px",
color:"white"
}}>

<h1>
Teacher Dashboard
</h1>

{teacher && (

<div>

<h3>
Branch:
{teacher.branch}
</h3>

<h3>
Semester:
{teacher.semester}
</h3>

</div>

)}

<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(4,1fr)",
gap:"20px",
marginTop:"20px"
}}
>

<button>
Students
</button>

<button>
Assignments
</button>

<button>
Attendance
</button>

<button>
Notes
</button>

</div>


<h2 style={{
marginTop:"40px"
}}>
Students
</h2>


<table
style={{
width:"100%",
marginTop:"20px",
background:"#111",
padding:"10px"
}}
>

<thead>

<tr>

<th>Name</th>
<th>Email</th>
<th>Branch</th>
<th>Semester</th>

</tr>

</thead>

<tbody>

{

students.map(
s=>(

<tr key={s._id}>

<td>{s.name}</td>
<td>{s.email}</td>
<td>{s.branch}</td>
<td>{s.semester}</td>

</tr>

)

)

}

</tbody>

</table>

</div>

);

}