import { useState }
from "react";

import axios
from "axios";

import { useNavigate }
from "react-router-dom";

export default function CreateClass(){

const navigate =
useNavigate();

const [subject,setSubject]
=
useState("");

const [teacher,setTeacher]
=
useState("");

const [semester,setSemester]
=
useState("");



const handleSubmit =
async(e)=>{

e.preventDefault();

try{

const token =
localStorage.getItem(
"token"
);


await axios.post(

"https://smart-classroom-system-23f9.onrender.com/api/classes",

{

subject,
teacher,
semester

},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);


alert(
"Class Created"
);

navigate(
"/classes"
);

}

catch(err){

console.log(err);

alert(
"Failed"
);

}

};



return(

<div className="
min-h-screen
bg-slate-950
flex
justify-center
items-center
text-white
">

<form

onSubmit={handleSubmit}

className="
bg-slate-900
p-10
rounded-3xl
w-[500px]
"

>

<h1 className="
text-4xl
font-bold
mb-8
">

Create Class

</h1>



<input

placeholder="Subject"

className="
w-full
p-4
bg-slate-800
mb-5
rounded-xl
"

onChange={(e)=>
setSubject(
e.target.value
)}

>



</input>



<input

placeholder="Teacher"

className="
w-full
p-4
bg-slate-800
mb-5
rounded-xl
"

onChange={(e)=>
setTeacher(
e.target.value
)}

>



</input>



<input

placeholder="Semester"

className="
w-full
p-4
bg-slate-800
mb-8
rounded-xl
"

onChange={(e)=>
setSemester(
e.target.value
)}

>



</input>



<button

className="
w-full
bg-indigo-600
p-4
rounded-xl
hover:bg-indigo-500
"

>

Create Class

</button>


</form>

</div>

)

}