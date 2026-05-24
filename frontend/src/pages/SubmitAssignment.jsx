import axios from "axios";
import { useState } from "react";

export default function SubmitAssignment(){

const [form,setForm]=useState({

student:"",
branch:"",
semester:"",
subject:"",
title:"",
link:""

});


const submit=async()=>{

try{

await axios.post(

"http://localhost:5000/api/assignments",

form

);

alert("Submitted");

}catch(err){

console.log(err);

alert("Failed");

}

};


return(

<div
style={{
padding:"40px",
color:"white"
}}
>

<h1>Submit Assignment</h1>


<input
placeholder="Student"
style={input}
onChange={(e)=>
setForm({
...form,
student:e.target.value
})
}
/>


<input
placeholder="Branch"
style={input}
onChange={(e)=>
setForm({
...form,
branch:e.target.value
})
}
/>


<input
placeholder="Semester"
style={input}
onChange={(e)=>
setForm({
...form,
semester:e.target.value
})
}
/>



<input
placeholder="Subject"
style={input}
onChange={(e)=>
setForm({
...form,
subject:e.target.value
})
}
/>



<input
placeholder="Title"
style={input}
onChange={(e)=>
setForm({
...form,
title:e.target.value
})
}
/>



<input
placeholder="Drive Link"
style={input}
onChange={(e)=>
setForm({
...form,
link:e.target.value
})
}
/>



<button
onClick={submit}
style={button}
>

Submit

</button>


</div>

)

}


const input={

display:"block",
margin:"20px 0",
padding:"15px",
width:"400px",

background:"#1e293b",

color:"white",

border:"1px solid #555",

borderRadius:"8px",

fontSize:"16px"

};


const button={

padding:"12px 30px",

background:"purple",

color:"white",

border:"none",

borderRadius:"8px",

cursor:"pointer"

};