import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
PieChart,
Pie,
Cell,
ResponsiveContainer,
Tooltip
} from "recharts";

import {

FaBook,
FaBell,
FaClipboard,
FaUserGraduate,
FaStickyNote,
FaHome,
FaSignOutAlt

}

from "react-icons/fa";

export default function StudentDashboard(){

const nav=useNavigate();

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

setSubjects(
sub.data
);



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



const note=
await axios.get(

"https://smart-classroom-system-23f9.onrender.com/api/notes"

);

setNotes(
note.data
);



const assign=
await axios.get(

"https://smart-classroom-system-23f9.onrender.com/api/assignments"

);

setAssignments(
assign.data
);



const notify=
await axios.get(

"https://smart-classroom-system-23f9.onrender.com/api/notifications"

);

setNotifications(
notify.data
);

}catch(err){

console.log(err);

}

}




function logout(){

localStorage.clear();

nav("/");

}



const totalPresent=

attendance.reduce(

(sum,a)=>

sum+a.present,

0

);



const totalClasses=

attendance.reduce(

(sum,a)=>

sum+a.total,

0

);



const overall=

totalClasses

?

(totalPresent/totalClasses)

*100

:

0;



const pieData=

attendance.map(

a=>({
name:a.subject,

value:

Math.round(

(a.present/a.total)

*100

)

})

);





return(

<div className="

flex
min-h-screen

bg-slate-950
text-white

">



{/* SIDEBAR */}



<div className="

w-64
bg-slate-900

p-6

shadow-2xl

sticky
top-0

h-screen

">

<h1 className="

text-3xl
font-bold

mb-12

">

🏫 Smart

</h1>



<div className="space-y-6">


<button

onClick={()=>

document

.getElementById(

"subjects"

)

.scrollIntoView()

}

className="

flex
items-center
gap-3

hover:text-blue-400

"

>

<FaBook/>

Subjects

</button>



<button

onClick={()=>

document

.getElementById(

"notes"

)

.scrollIntoView()

}

className="

flex
items-center
gap-3

hover:text-yellow-400

"

>

<FaStickyNote/>

Notes

</button>




<button

onClick={()=>

document

.getElementById(

"assignments"

)

.scrollIntoView()

}

className="

flex
items-center
gap-3

hover:text-green-400

"

>

<FaClipboard/>

Assignments

</button>




<button

onClick={()=>

document

.getElementById(

"grades"

)

.scrollIntoView()

}

className="

flex
items-center
gap-3

hover:text-orange-400

"

>

<FaUserGraduate/>

Grades

</button>




<button

onClick={()=>

document

.getElementById(

"notifications"

)

.scrollIntoView()

}

className="

flex
items-center
gap-3

hover:text-purple-400

"

>

<FaBell/>

Notifications

</button>



</div>



<button

onClick={logout}

className="

absolute

bottom-10

bg-red-500

px-5
py-3

rounded-xl

flex
items-center
gap-2

"

>

<FaSignOutAlt/>

Logout

</button>

</div>





{/* MAIN */}



<div className="flex-1 p-10">

<h1 className="text-6xl font-bold">

Student Dashboard

</h1>


<div className="mt-3">

{user?.branch}

Semester {user?.semester}

</div>




<div className="grid grid-cols-2 gap-10 mt-10">

<div className="bg-slate-900 p-10 rounded-3xl">

<h2>

Attendance

</h2>

<h1 className="text-7xl">

{

Math.round(

overall

)

}%

</h1>

</div>



<div className="bg-slate-900 p-10 rounded-3xl">

<ResponsiveContainer
width="100%"
height={250}
>

<PieChart>

<Pie

data={pieData}

dataKey="value"

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




{/* QUICK BUTTONS */}



<div className="

grid
grid-cols-4

gap-5

mt-10

">

<button
onClick={()=>
document.getElementById("subjects")
.scrollIntoView()
}
className="bg-blue-600 p-6 rounded-xl">

Subjects

</button>


<button
onClick={()=>
document.getElementById("assignments")
.scrollIntoView()
}
className="bg-green-600 p-6 rounded-xl">

Assignments

</button>


<button
onClick={()=>
document.getElementById("notifications")
.scrollIntoView()
}
className="bg-purple-600 p-6 rounded-xl">

Notifications

</button>


<button
onClick={()=>
document.getElementById("grades")
.scrollIntoView()
}
className="bg-orange-600 p-6 rounded-xl">

Grades

</button>

</div>




{/* SUBJECTS */}



<section
id="subjects"
className="mt-12"
>

<h1 className="text-4xl">

Subjects

</h1>

{

subjects.map(

s=>

<div
key={s._id}
className="bg-slate-900 p-5 mt-5 rounded">

{s.code}

<br/>

{s.name}

</div>

)

}

</section>




<section
id="notes"
className="mt-12"
>

<h1 className="text-4xl">

Notes

</h1>

{

notes.map(

n=>

<div
key={n._id}
className="bg-slate-900 p-5 mt-5 rounded">

{n.title}

</div>

)

}

</section>





<section
id="assignments"
className="mt-12"
>

<h1 className="text-4xl">

Assignments

</h1>

{

assignments.map(

a=>

<div
key={a._id}
className="bg-slate-900 p-5 mt-5 rounded">

{a.title}

</div>

)

}

</section>





<section
id="notifications"
className="mt-12"
>

<h1 className="text-4xl">

Notifications

</h1>

{

notifications.map(

n=>

<div
key={n._id}
className="bg-slate-900 p-5 mt-5 rounded">

{n.message}

</div>

)

}

</section>



</div>

</div>

);

}