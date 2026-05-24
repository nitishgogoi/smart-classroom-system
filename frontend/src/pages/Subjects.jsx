import {

useEffect,
useState

}

from "react";

import axios
from "axios";


export default function Subjects(){

const [subjects,
setSubjects]
=
useState([]);



useEffect(()=>{

load();

},[]);



const load =
async()=>{

const res =
await axios.get(

"http://localhost:5000/api/subjects"

);

setSubjects(
res.data
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
font-bold
mb-10

">

Subjects

</h1>



{

subjects.map(

s=>(

<div

key={s._id}

className="

bg-slate-900
p-8
rounded-3xl
mb-5

"

>

<h2>

{s.name}

</h2>


<p>

{s.branch}

</p>


<p>

Semester:
{s.semester}

</p>

</div>

)

)

}

</div>

)

}