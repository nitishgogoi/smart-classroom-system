import { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherDashboard(){

const [students,setStudents]=useState([]);
const [teacher,setTeacher]=useState(null);

useEffect(()=>{

async function load(){

try{

const email =
localStorage.getItem("email");

const teacherRes =
await axios.get(
"https://smart-classroom-system-23f9.onrender.com/api/users/teachers"
);

const currentTeacher =
teacherRes.data.find(
t=>t.email===email
);

setTeacher(currentTeacher);

if(!currentTeacher) return;

const studentRes =
await axios.get(
"https://smart-classroom-system-23f9.onrender.com/api/users/students"
);

const filtered =
studentRes.data.filter(

s=>

s.branch===currentTeacher.branch &&
Number(s.semester)===Number(currentTeacher.semester)

);

setStudents(filtered);

}
catch(err){

console.log(err);

}

}

load();

},[]);


return(

<div style={{
padding:"30px",
color:"white"
}}>

<h1>Teacher Dashboard</h1>

{

teacher && (

<>
<h3>
Branch:
{teacher.branch}
</h3>

<h3>
Semester:
{teacher.semester}
</h3>
</>

)

}


<h2>
Students
</h2>


{

students.map(

s=>(

<div key={s._id}>

{s.name}
-
{s.email}

</div>

)

)

}

</div>

);

}