import {
useEffect,
useState
}
from "react";

import axios
from "axios";


export default function Notes(){

const [notes,setNotes]=
useState([]);


useEffect(()=>{

fetchNotes();

},[]);



async function fetchNotes(){

const res =
await axios.get(

"http://localhost:5000/api/notes"

);

setNotes(
res.data
);

}



return(

<div className="

bg-slate-950
min-h-screen
text-white
p-10

">

<h1 className="

text-6xl
mb-10

">

Notes

</h1>



<div className="space-y-5">

{

notes.map(note=>(

<div

key={note._id}

className="

bg-slate-900
p-6
rounded-2xl

"

>

<h2>

{note.title}

</h2>


<p>

{note.subject}

</p>


<p>

Semester:
{note.semester}

</p>


<a

href={note.file}

target="_blank"

className="

text-blue-400

"

>

Open Notes

</a>

</div>

))

}

</div>

</div>

)

}   