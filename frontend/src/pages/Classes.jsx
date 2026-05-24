import { useEffect,useState }
from "react";

import axios
from "axios";

export default function Classes(){

const [classes,
setClasses]
=
useState([]);

useEffect(()=>{

fetchClasses();

},[]);



const fetchClasses =
async()=>{

try{

const token =
localStorage.getItem(
"token"
);


const res =
await axios.get(

"http://localhost:5000/api/classes",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);


setClasses(
res.data
);

}

catch(err){

console.log(err);

}

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

Classes

</h1>



<div className="
grid
grid-cols-3
gap-6
">

{

classes.map(
(item)=>(

<div

key={item._id}

className="
bg-slate-900
p-8
rounded-3xl
hover:scale-105
duration-300
"

>

<h2 className="
text-2xl
">

{item.subject}

</h2>


<p className="
text-gray-400
">

Semester:

{item.semester}

</p>


<p className="
mt-4
">

{item.teacher}

</p>

</div>

)

)

}

</div>

</div>

)

}