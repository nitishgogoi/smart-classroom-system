import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {

FaBook,
FaBell,
FaClipboard,
FaStickyNote,
FaUserGraduate,
FaSignOutAlt,
FaBars

}

from "react-icons/fa";

import {

PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer

}

from "recharts";


export default function StudentDashboard(){

const nav=useNavigate();

const [open,setOpen]=useState(true);

const [user,setUser]=useState(null);

const [subjects,setSubjects]=useState([]);
const [attendance,setAttendance]=useState([]);
const [notes,setNotes]=useState([]);
const [assignments,setAssignments]=useState([]);
const [notifications,setNotifications]=useState([]);



useEffect(()=>{

const u=
JSON.parse(
localStorage.getItem("user")
);

if(!u){

nav("/");
return;

}

setUser(u);

loadAll(
u.branch,
u.semester
);

},[]);



async function loadAll(
branch,
semester
){

try{

const sub=
await axios.get(
`https://smart-classroom-system-23f9.onrender.com/api/subjects?branch=${branch}&semester=${semester}`
);

setSubjects(sub.data);


const att=
await axios.get(
"https://smart-classroom-system-23f9.onrender.com/api/attendance"
);

setAttendance(

att.data.filter(

a=>

a.branch===branch &&

Number(a.semester)===Number(semester)

)

);


try{

const n=
await axios.get(
"https://smart-classroom-system-23f9.onrender.com/api/notes"
);

setNotes(n.data);

}catch{}



try{

const a=
await axios.get(
"https://smart-classroom-system-23f9.onrender.com/api/assignments"
);

setAssignments(a.data);

}catch{}



try{

const not=
await axios.get(
"https://smart-classroom-system-23f9.onrender.com/api/notifications"
);

setNotifications(not.data);

}catch{}

}
catch(err){

console.log(err);

}

}



function logout(){

localStorage.clear();

nav("/");

}



const present=
attendance.reduce(
(s,a)=>s+a.present,
0
);

const total=
attendance.reduce(
(s,a)=>s+a.total,
0
);

const overall=

total

?

(present/total)*100

:

0;



const chart=

attendance.map(

a=>({
name:a.subject,

value:

Math.round(
(a.present/a.total)*100
)

})

);



return(

<div className="flex bg-slate-950 text-white min-h-screen">


{/* SIDEBAR */}


<div

className={`

bg-slate-900

transition-all

${open?"w-64":"w-20"}

p-5

sticky
top-0

h-screen

`}

>

<button

onClick={()=>

setOpen(
!open
)

}

>

<FaBars/>

</button>


<h1 className="mt-8 text-3xl">

🏫

{open&&" Smart"}

</h1>



<div className="mt-12 space-y-8">


<button onClick={()=>
document.getElementById("subjects")
.scrollIntoView()
}
className="flex gap-3 hover:text-blue-400">

<FaBook/>

{open&&"Subjects"}

</button>



<button onClick={()=>
document.getElementById("notes")
.scrollIntoView()
}
className="flex gap-3 hover:text-yellow-400">

<FaStickyNote/>

{open&&"Notes"}

</button>



<button onClick={()=>
document.getElementById("assignments")
.scrollIntoView()
}
className="flex gap-3 hover:text-green-400">

<FaClipboard/>

{open&&"Assignments"}

</button>



<button onClick={()=>
document.getElementById("notifications")
.scrollIntoView()
}
className="flex gap-3 hover:text-purple-400">

<FaBell/>

{open&&"Notifications"}

</button>

</div>



<button

onClick={logout}

className="

absolute
bottom-10

bg-red-500

px-4
py-3

rounded-xl

flex
gap-2

"

>

<FaSignOutAlt/>

{open&&"Logout"}

</button>

</div>




{/* MAIN */}


<div className="flex-1 p-10">

<h1 className="text-7xl font-bold">

Student Dashboard

</h1>


<p>

{user?.branch}

Semester {user?.semester}

</p>




<div className="grid grid-cols-2 gap-8 mt-10">


<div className="bg-slate-900 rounded-3xl p-10">

Attendance

<h1 className="text-7xl">

{

Math.round(
overall
)

}%

</h1>

</div>




<div className="bg-slate-900 rounded-3xl p-10">

<ResponsiveContainer
width="100%"
height={260}
>

<PieChart>

<Pie

data={chart}

dataKey="value"

outerRadius={95}

label

>

{

chart.map(

(_,i)=>

<Cell

key={i}

fill={[

"#22c55e",
"#3b82f6",
"#ef4444",
"#eab308"

][i%4]}

/>

)

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</div>





{/* CARDS */}



<div className="grid grid-cols-4 gap-6 mt-10">

<Card title="Subjects" count={subjects.length}/>
<Card title="Assignments" count={assignments.length}/>
<Card title="Notes" count={notes.length}/>
<Card title="Notifications" count={notifications.length}/>

</div>





<Section
id="subjects"
title="Subjects"
data={subjects}
field="name"
/>


<Section
id="notes"
title="Notes"
data={notes}
field="title"
/>


<Section
id="assignments"
title="Assignments"
data={assignments}
field="title"
/>


<Section
id="notifications"
title="Notifications"
data={notifications}
field="message"
/>



</div>

</div>

);

}




function Card({

title,
count

}){

return(

<div className="

bg-slate-900

p-8
rounded-2xl

hover:scale-105

transition

">

<h2>

{title}

</h2>

<h1 className="text-4xl">

{count}

</h1>

</div>

);

}




function Section({

id,
title,
data,
field

}){

return(

<section

id={id}

className="mt-12"

>

<h1 className="text-4xl">

{title}

</h1>

{

data.length

?

data.map(

d=>

<div

key={d._id}

className="

bg-slate-900
p-5
rounded

mt-5

"

>

{d[field]}

</div>

)

:

<p className="mt-4 text-gray-400">

No data available

</p>

}

</section>

);

}