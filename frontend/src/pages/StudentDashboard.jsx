import {
useEffect,
useState
}
from "react";

import axios from "axios";

import {

PieChart,
Pie,
Cell,
ResponsiveContainer

}

from "recharts";

import {

FaBook,
FaBell,
FaClipboard,
FaUserGraduate

}

from "react-icons/fa";

import {
useNavigate
}
from "react-router-dom";


export default function StudentDashboard(){

const nav=
useNavigate();


const [subjects,setSubjects]=
useState([]);

const [attendance,
setAttendance]=
useState([]);

const [user,
setUser]=
useState(null);



useEffect(()=>{

const u=

JSON.parse(

localStorage.getItem(
"user"
)

);

setUser(u);

loadSubjects(
u.branch,
u.semester
);

loadAttendance(
u.branch,
u.semester
);

},[]);




async function loadSubjects(

branch,
semester

){

const res=

await axios.get(

`https://smart-classroom-system-23f9.onrender.com/api/subjects?branch=${branch}&semester=${semester}`

);

setSubjects(
res.data
);

}



async function loadAttendance(

branch,
semester

){

const res=

await axios.get(

"https://smart-classroom-system-23f9.onrender.com/api/attendance"

);


const filtered=

res.data.filter(

a=>

a.branch===branch

&&

a.semester===semester

);


setAttendance(
filtered
);

}



function logout(){

localStorage.clear();

nav("/");

}



const totalPresent =
attendance.reduce(
(sum,a)=>
sum + Number(a.present),
0
);

const totalClasses =
attendance.reduce(
(sum,a)=>
sum + Number(a.total),
0
);

const totalAttendance =
totalClasses > 0
?
(totalPresent/totalClasses)*100
:
0;



const chart=[

{

name:"Present",

value:

totalAttendance

},

{

name:"Absent",

value:

100-totalAttendance

}

];




return(

<div className="

bg-slate-950
text-white
min-h-screen
flex

">



{/* SIDEBAR */}


<div className="

w-24
hover:w-72

transition-all

bg-slate-900

h-screen

p-6

overflow-hidden

">

<h1 className="

text-4xl
font-bold

">

🏫

</h1>


<div className="

mt-12
space-y-8

">

<p>📚 Subjects</p>

<p>📝 Notes</p>

<p>📂 Assignments</p>

<p>📊 Grades</p>

<p>🔔 Notifications</p>

</div>



<button

onClick={logout}

className="

mt-20
bg-red-500

px-5
py-3

rounded-xl

"

>

Logout

</button>

</div>




{/* MAIN */}



<div className="

flex-1
p-10

space-y-10

">




<div className="

flex
justify-between

">

<h1 className="

text-6xl
font-bold

">

Student Dashboard

</h1>



<div className="

bg-slate-900

p-5
rounded-xl

">

<h3>

{user?.branch}

</h3>


<p>

Semester

{user?.semester}

</p>

</div>

</div>





{/* ATTENDANCE */}



<div className="

grid
grid-cols-2
gap-10

">

<div className="

bg-slate-900

rounded-3xl
p-10

">

<h2 className="

text-4xl

">

Attendance

</h2>


<h1 className="

text-7xl
font-bold
mt-5

">

{

Math.round(

totalAttendance

)

}%

</h1>


<p>

Overall Attendance

</p>

</div>




<div className="

bg-slate-900

rounded-3xl
p-10

">

<ResponsiveContainer
width="100%"
height={250}

>

<PieChart>

<Pie

data={chart}

dataKey="value"

outerRadius={90}

>

<Cell fill="#22c55e"/>

<Cell fill="#ef4444"/>

</Pie>

</PieChart>

</ResponsiveContainer>

</div>

</div>






{/* QUICK CARDS */}



<div className="

grid
grid-cols-4
gap-5

">

<div className="

bg-blue-600
p-6
rounded-xl

">

<FaBook/>

Subjects

</div>



<div className="

bg-green-600
p-6
rounded-xl

">

<FaClipboard/>

Assignments

</div>



<div className="

bg-purple-600
p-6
rounded-xl

">

<FaBell/>

Notifications

</div>



<div className="

bg-orange-600
p-6
rounded-xl

">

<FaUserGraduate/>

Grades

</div>

</div>






{/* SUBJECTS */}



<div className="

bg-slate-900

rounded-3xl
p-10

">

<h1 className="

text-4xl
mb-8

">

Subjects

</h1>


{

subjects.map(

s=>(

<div

key={s._id}

className="

bg-slate-800

p-5
mb-4

rounded-xl

"

>

<p>

{s.code}

</p>


<h2>

{s.name}

</h2>

</div>

)

)

}

</div>







{/* SUBJECT ATTENDANCE */}



<div className="

bg-slate-900

rounded-3xl
p-10

">

<h1 className="

text-4xl
mb-8

">

Subject Attendance

</h1>


{

attendance.map(

a=>(

<div

key={a._id}

className="

bg-slate-800

p-5
mb-5

rounded-xl

"

>

<h2>

{a.subject}

</h2>


<p>

Present:

{a.present}

/

{a.total}

</p>


<p>
{
Math.round(
(a.present/a.total)*100
)
}%
</p>



<div className="

bg-slate-700
h-3
rounded

">

<div

className="

h-3
rounded

"

style={{

width:
`${Math.round(
(a.present/a.total)*100
)}%`,

background:

(
(a.present/a.total)*100
)<75
?
"red"
:
"green"

}}

>

</div>

</div>


</div>

)

)

}

</div>




</div>

</div>

)

}