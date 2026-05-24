import {
useState
}
from "react";

import axios
from "axios";


export default function Assignments(){

const [title,setTitle]=
useState("");

const [subject,setSubject]=
useState("");

const [deadline,setDeadline]=
useState("");



async function upload(){

await axios.post(

"https://smart-classroom-system-23f9.onrender.com/api/assignments",

{

title,
subject,
deadline,

teacher:"Teacher1",

branch:"Computer Engineering",

semester:"6"

}

);

alert(
"Assignment uploaded"
);

}



return(

<div className="

bg-slate-950
min-h-screen
text-white
p-10

">

<h1 className="text-5xl">

Create Assignment

</h1>


<div className="

space-y-5
mt-10
max-w-xl

">

<input

placeholder="Title"

className="

p-4
w-full
bg-slate-800

"

onChange={
e=>
setTitle(
e.target.value
)
}

/>


<input

placeholder="Subject"

className="

p-4
w-full
bg-slate-800

"

onChange={
e=>
setSubject(
e.target.value
)
}

/>


<input

placeholder="Deadline"

className="

p-4
w-full
bg-slate-800

"

onChange={
e=>
setDeadline(
e.target.value
)
}

/>



<button

onClick={upload}

className="

bg-purple-700
px-8
py-4
rounded-xl

"

>

Upload

</button>

</div>

</div>

)

}