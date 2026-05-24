import {useEffect,useState}
from "react";

import axios from "axios";

export default function Grades(){

const [grades,setGrades]=
useState([]);

useEffect(()=>{

load();

},[]);



const load=
async()=>{

const res=
await axios.get(

"http://localhost:5000/api/grades"

);

setGrades(
res.data
);

};



return(

<div className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-5xl mb-10">

Grades

</h1>


{

grades.map(

g=>(

<div

key={g._id}

className="bg-slate-900 p-6 rounded-2xl mb-4"

>

<h2>

{g.subject}

</h2>

<p>

Internal:
{g.internal}

</p>

<p>

Exam:
{g.exam}

</p>

<p>

Total:
{g.total}

</p>

</div>

)

)

}

</div>

)

}