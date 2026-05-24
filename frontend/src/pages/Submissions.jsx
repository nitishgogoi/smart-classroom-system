import { useEffect,useState }
from "react";

import axios
from "axios";


export default function Submissions(){

const [data,setData]
=
useState([]);

const [marks,
setMarks]
=
useState("");



useEffect(()=>{

load();

},[]);



const load =
async()=>{

const token =
localStorage.getItem(
"token"
);

const res =
await axios.get(

"http://localhost:5000/api/submissions",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);

setData(
res.data
);

};



const giveMarks =
async(id)=>{

const token =
localStorage.getItem(
"token"
);


await axios.put(

`http://localhost:5000/api/submissions/${id}`,

{

marks

},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);


alert(
"Marked"
);

load();

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

Student Submissions

</h1>



{

data.map(item=>(

<div

key={item._id}

className="
bg-slate-900
p-8
rounded-3xl
mb-6
"

>

<h2>

{item.assignmentTitle}

</h2>

<p>

Student:
{item.student}

</p>

<p>

Status:
{item.status}

</p>

<p>

Marks:
{

item.marks
||
"Not graded"

}

</p>



<input

placeholder=
"Enter Marks"

onChange={(e)=>
setMarks(
e.target.value
)
}

className="
bg-slate-800
p-3
rounded-xl
mt-4
mr-4
"

/>



<button

onClick={()=>

giveMarks(
item._id
)

}

className="
bg-indigo-600
px-5
py-3
rounded-xl
"

>

Save Marks

</button>

</div>

))

}

</div>

)

}