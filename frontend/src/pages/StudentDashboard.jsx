import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
ResponsiveContainer,
PieChart,
Pie,
Tooltip,
Cell
} from "recharts";

export default function StudentDashboard(){

const nav = useNavigate();

const [user,setUser]=useState(null);
const [subjects,setSubjects]=useState([]);
const [attendance,setAttendance]=useState([]);

useEffect(()=>{

const u =
JSON.parse(
localStorage.getItem("user")
);

if(!u){

nav("/");
return;

}

setUser(u);

loadData(
u.branch,
u.semester
);

},[]);



async function loadData(
branch,
semester
){

try{

const sub =
await axios.get(

`https://smart-classroom-system-23f9.onrender.com/api/subjects?branch=${branch}&semester=${semester}`

);

setSubjects(
sub.data
);



const att =
await axios.get(

"https://smart-classroom-system-23f9.onrender.com/api/attendance"

);

const filtered =
att.data.filter(

a=>

a.branch===branch &&

Number(a.semester)===Number(semester)

);

setAttendance(
filtered
);

}catch(err){

console.log(err);

}

}



function logout(){

localStorage.clear();
nav("/");

}



/* overall attendance */

const overallPresent =
attendance.reduce(
(s,a)=>s+a.present,
0
);

const overallTotal =
attendance.reduce(
(s,a)=>s+a.total,
0
);

const overallPercent =

overallTotal>0

?

(overallPresent/overallTotal)*100

:

0;



/* SUBJECT PIE */

const pieData =

attendance.map(a=>({

name:a.subject,

value:

Math.round(
(a.present/a.total)*100
)

}));



return(

<div className="bg-slate-950 text-white flex min-h-screen">


{/* sidebar */}

<div className="w-64 bg-slate-900 p-6">

<h1 className="text-3xl">

🏫

</h1>

<div className="space-y-8 mt-10">

<button
onClick={()=>
document
.getElementById("subjects")
.scrollIntoView()
}
>
📚 Subjects
</button>

<button
onClick={()=>
document
.getElementById("attendance")
.scrollIntoView()
}
>
📊 Attendance
</button>

<button
onClick={()=>
window.scrollTo(
0,
document.body.scrollHeight
)
}
>
📝 Bottom
</button>

</div>


<button

onClick={logout}

className="

bg-red-500
px-5
py-3
rounded
mt-20

"

>

Logout

</button>

</div>




{/* main */}

<div className="flex-1 p-10">

<h1 className="text-6xl font-bold">

Student Dashboard

</h1>

<p className="mt-2">

{user?.branch}

Semester {user?.semester}

</p>



<div className="grid grid-cols-2 gap-8 mt-10">


<div className="bg-slate-900 p-10 rounded">

<h2>

Overall Attendance

</h2>

<h1 className="text-7xl">

{

Math.round(
overallPercent
)

}%

</h1>

</div>




<div className="bg-slate-900 p-10 rounded">

<ResponsiveContainer
width="100%"
height={300}
>

<PieChart>

<Pie

data={pieData}

dataKey="value"

nameKey="name"

label

>

{

pieData.map(

(_,i)=>

<Cell

key={i}

fill={[

"#22c55e",
"#3b82f6",
"#ef4444",
"#eab308",
"#8b5cf6"

][i%5]}

/>

)

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</div>



{/* subjects */}

<div

id="subjects"

className="

bg-slate-900
rounded
p-10
mt-10

"

>

<h1 className="text-4xl">

Subjects

</h1>


{

subjects.map(

s=>

<div

key={s._id}

className="

bg-slate-800
p-5
rounded
mt-4

"

>

{s.code}

<br/>

{s.name}

</div>

)

}

</div>




{/* attendance */}

<div

id="attendance"

className="

bg-slate-900
rounded
p-10
mt-10

"

>

<h1 className="text-4xl">

Subject Attendance

</h1>


{

attendance.map(

a=>

<div

key={a._id}

className="

bg-slate-800
p-5
rounded
mt-5

"

>

<h2>

{a.subject}

</h2>


<p>

{a.present}

/

{a.total}

</p>


<div className="bg-gray-700 h-3 rounded">

<div

className="h-3 bg-green-500 rounded"

style={{

width:

`${

(a.present/a.total)

*100

}%`

}}

>

</div>

</div>

</div>

)

}

</div>


</div>

</div>

);

}