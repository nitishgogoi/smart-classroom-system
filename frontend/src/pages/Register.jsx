import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register(){

const navigate = useNavigate();

const [form,setForm] =
useState({

name:"",
email:"",
password:"",
role:"student",
branch:"Computer Engineering",
semester:1

});


const change=(e)=>{

setForm({

...form,

[e.target.name]:
e.target.value

});

};



const submit=
async()=>{

try{

const payload = {

name:form.name,
email:form.email,
password:form.password,
role:form.role

};


/* only students need branch+semester */

if(form.role==="student"){

payload.branch=
form.branch;

payload.semester=
Number(
form.semester
);

}


await axios.post(

"http://localhost:5000/api/auth/register",

payload

);

alert(
"Registered"
);

navigate("/");

}

catch(err){

console.log(err);

alert(

err.response?.data?.message

||

"Registration failed"

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

<div className="
bg-slate-900
p-10
rounded-3xl
w-[450px]
space-y-5
">

<h1 className="
text-5xl
font-bold
mb-5
">

Register

</h1>



<input
name="name"
placeholder="Name"
onChange={change}
className="
w-full
p-4
rounded-xl
bg-slate-800
"
/>



<input
name="email"
placeholder="Email"
onChange={change}
className="
w-full
p-4
rounded-xl
bg-slate-800
"
/>



<input
type="password"
name="password"
placeholder="Password"
onChange={change}
className="
w-full
p-4
rounded-xl
bg-slate-800
"
/>



<select
name="role"
onChange={change}
className="
w-full
p-4
rounded-xl
bg-slate-800
"
>

<option value="student">

student

</option>

<option value="teacher">

teacher

</option>

</select>



{

form.role==="student"

&&

<>

<select
name="branch"
onChange={change}
className="
w-full
p-4
rounded-xl
bg-slate-800
"
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
name="semester"
onChange={change}
className="
w-full
p-4
rounded-xl
bg-slate-800
"
>

<option value="1">
Semester 1
</option>

<option value="2">
Semester 2
</option>

<option value="3">
Semester 3
</option>

<option value="4">
Semester 4
</option>

<option value="5">
Semester 5
</option>

<option value="6">
Semester 6
</option>

</select>

</>

}



<button

onClick={submit}

className="
w-full
bg-indigo-600
p-4
rounded-xl
"

>

Register

</button>

</div>

</div>

)

}