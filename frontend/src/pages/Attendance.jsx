import {
useEffect,
useState
}
from "react";

import axios
from "axios";


export default function Attendance(){

const [students,
setStudents]
=
useState([]);

const [subjects,
setSubjects]
=
useState([]);

const [branch,
setBranch]
=
useState(
"Computer Engineering"
);

const [semester,
setSemester]
=
useState(1);

const [subject,
setSubject]
=
useState("");



useEffect(()=>{

loadStudents();
loadSubjects();

},[
branch,
semester
]);



const loadStudents=
async()=>{

const res=
await axios.get(

"http://localhost:5000/api/users/students"

);

setStudents(

res.data.filter(

s=>

s.branch===branch

&&

s.semester==semester

)

);

};



const loadSubjects=
async()=>{

const res=
await axios.get(

"http://localhost:5000/api/subjects"

);


setSubjects(

res.data.filter(

s=>

s.branch===branch

&&

s.semester==semester

)

);

};



const mark=
async(

student,
status

)=>{

await axios.post(

"http://localhost:5000/api/attendance",

{

student:
student.name,

branch,

semester,

subject,

status

}

);


alert(
"Saved"
);

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
mb-10

">

Attendance

</h1>



<div className="

flex
gap-5
mb-10

">


<select

onChange={e=>

setBranch(
e.target.value
)

}

>

<option>

Computer Engineering

</option>

<option>

Printing Technology

</option>

<option>

Electrical Engineering

</option>

</select>




<select

onChange={e=>

setSemester(
e.target.value
)

}

>

<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>
<option>6</option>

</select>




<select

onChange={e=>

setSubject(
e.target.value
)

}

>

{

subjects.map(

s=>

<option>

{s.name}

</option>

)

}

</select>

</div>



{

students.map(

student=>(

<div

key={student._id}

className="

bg-slate-900
p-6
rounded-2xl
mb-4
flex
justify-between

"

>

<p>

{student.name}

</p>


<div>

<button

onClick={()=>

mark(

student,

"Present"

)

}

>

Present

</button>



<button

onClick={()=>

mark(

student,

"Absent"

)

}

>

Absent

</button>

</div>

</div>

)

)

}

</div>

)

}