import { useEffect,useState } from "react";
import axios from "axios";

export default function StudentAssignments(){

const [assignments,setAssignments]=
useState([]);

useEffect(()=>{

fetchAssignments();

},[]);


const fetchAssignments =
async()=>{

try{

const token =
localStorage.getItem("token");

const res =
await axios.get(

"https://smart-classroom-system-23f9.onrender.com/api/assignments",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);

setAssignments(
res.data
);

}
catch(err){

console.log(err);

}

};


return(

<div className="
min-h-screen
bg-slate-950
text-white
p-10
">

<h1 className="
text-5xl
font-bold
mb-10
">

Assignments

</h1>


<div className="
space-y-6
">

{

assignments.map(

(a)=>(

<div

key={a._id}

className="
bg-slate-900
p-8
rounded-3xl
"

>

<h2 className="
text-2xl
font-bold
">

{a.title}

</h2>

<p>

Subject:
{a.subject}

</p>

<p>

{a.description}

</p>

<p>

Deadline:
{

new Date(
a.deadline
).toLocaleDateString()

}

</p>

<p>

Teacher:
{a.teacher}

</p>

</div>

)

)

}

</div>

</div>

)

}