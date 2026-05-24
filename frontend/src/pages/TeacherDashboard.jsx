import {
useNavigate
}
from "react-router-dom";

import {

FaBook,
FaClipboard,
FaUsers,
FaBell

}

from "react-icons/fa";


export default function TeacherDashboard(){

const nav =
useNavigate();


function logout(){

localStorage.clear();

nav("/");

}


return(

<div className="

bg-slate-950
text-white
min-h-screen
flex

">


{/* SIDEBAR */}

<div className="

w-24
hover:w-72

transition-all

bg-slate-900

h-screen

p-6

overflow-hidden

">

<h1 className="

text-4xl

">

👨‍🏫

</h1>



<div className="

mt-12
space-y-8

">

<p>

📚 Classes

</p>

<p>

📝 Assignments

</p>

<p>

📊 Attendance

</p>

<p>

🔔 Notices

</p>

</div>


<button

onClick={logout}

className="

bg-red-500
mt-20
px-5
py-3
rounded-xl

"

>

Logout

</button>

</div>





<div className="

flex-1
p-10

space-y-10

">

<h1 className="

text-6xl
font-bold

">

Teacher Dashboard

</h1>




<div className="

grid
grid-cols-4
gap-5

">

<div className="

bg-blue-600
p-10
rounded-2xl

">

<FaUsers/>

Students

</div>



<div className="

bg-green-600
p-10
rounded-2xl

">

<FaClipboard/>

Assignments

</div>



<div className="

bg-purple-600
p-10
rounded-2xl

">

<FaBook/>

Subjects

</div>



<div className="

bg-orange-600
p-10
rounded-2xl

">

<FaBell/>

Notifications

</div>

</div>





<div className="

bg-slate-900
rounded-3xl
p-10

h-72

">

<h1>

Attendance Overview

</h1>

</div>




<div className="

bg-slate-900
rounded-3xl
p-10

h-72

">

<h1>

Assignments

</h1>

</div>




<div className="

bg-slate-900
rounded-3xl
p-10

h-72

">

<h1>

Uploaded Notes

</h1>

</div>



</div>

</div>

)

}