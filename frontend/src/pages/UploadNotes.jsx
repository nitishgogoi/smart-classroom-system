import { useState }
from "react";

import axios
from "axios";


export default function UploadNotes(){

const [title,setTitle]=useState("");
const [subject,setSubject]=useState("");
const [branch,setBranch]=useState("");
const [semester,setSemester]=useState("");
const [teacher,setTeacher]=useState("");
const [file,setFile]=useState("");



async function upload(){

try{

await axios.post(

"https://smart-classroom-system-23f9.onrender.com/api/notes",

{
title,
subject,
branch,
semester,
teacher,
file
}

);

alert(
"Uploaded Successfully"
);

}

catch{

alert(
"Upload failed"
);

}

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

Upload Notes

</h1>



<div className="

space-y-6
max-w-xl

">

<input

placeholder="Title"

className="

w-full
p-4
rounded-xl

bg-slate-800
text-white

border

"

onChange={(e)=>
setTitle(
e.target.value
)}

 />


<input

placeholder="Subject"

className="

w-full
p-4
rounded-xl

bg-slate-800
text-white

border

"

onChange={(e)=>
setSubject(
e.target.value
)}

 />


<input

placeholder="Branch"

className="

w-full
p-4
rounded-xl

bg-slate-800
text-white

border

"

onChange={(e)=>
setBranch(
e.target.value
)}

 />


<input

placeholder="Semester"

className="

w-full
p-4
rounded-xl

bg-slate-800
text-white

border

"

onChange={(e)=>
setSemester(
e.target.value
)}

 />


<input

placeholder="Teacher"

className="

w-full
p-4
rounded-xl

bg-slate-800
text-white

border

"

onChange={(e)=>
setTeacher(
e.target.value
)}

 />


<input

placeholder="Google Drive Link"

className="

w-full
p-4
rounded-xl

bg-slate-800
text-white

border

"

onChange={(e)=>
setFile(
e.target.value
)}

 />



<button

onClick={upload}

className="

bg-purple-700
hover:bg-purple-800

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