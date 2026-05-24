import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

export default function Login(){

const navigate =
useNavigate();

const [email,setEmail] =
useState("");

const [password,
setPassword]
=
useState("");



const login =
async()=>{

try{

const res =
await axios.post(

"http://localhost:5000/api/auth/login",

{

email,
password

}

);


localStorage.setItem(

"token",

res.data.token

);

localStorage.setItem(

"user",

JSON.stringify(
res.data.user
)

);



if(

res.data.user.role
===

"teacher"

){

navigate(
"/teacher"
);

}

else{

navigate(
"/student"
);

}

}

catch(err){

console.log(err);

alert(

err.response?.data?.message

||

"Login Failed"

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
w-[420px]
space-y-5
">

<h1 className="
text-5xl
font-bold
">

Login

</h1>



<input

placeholder="Email"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

className="
w-full
p-4
rounded-xl
bg-slate-800
"

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

className="
w-full
p-4
rounded-xl
bg-slate-800
"

/>



<button

onClick={login}

className="
w-full
bg-indigo-600
p-4
rounded-xl
"

>

Login

</button>



<Link

to="/register"

className="
text-cyan-400
block
"

>

Create account

</Link>

</div>

</div>

)

}