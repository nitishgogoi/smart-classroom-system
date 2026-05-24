import { motion } from "framer-motion";

export default function Home() {

return (

<div className="
min-h-screen
bg-slate-950
text-white
overflow-hidden
relative
">

{/* background blur */}

<div className="
absolute
w-96 h-96
bg-indigo-600/20
blur-[120px]
top-10
left-10
"></div>

<div className="
absolute
w-96 h-96
bg-cyan-500/20
blur-[120px]
bottom-10
right-10
"></div>


{/* navbar */}

<nav className="
flex
justify-between
items-center
px-10
py-6
">

<h1 className="
text-2xl
font-bold
">

Smart Classroom

</h1>


<div className="space-x-6">

<button>
Login
</button>

<button className="
bg-indigo-600
px-5
py-2
rounded-xl
">

Register

</button>

</div>

</nav>



{/* hero */}

<div className="
flex
justify-center
items-center
h-[80vh]
text-center
">

<motion.div
initial={{opacity:0,y:50}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
>

<h1 className="
text-7xl
font-bold
mb-6
leading-tight
">

Manage

<span className="
bg-gradient-to-r
from-indigo-400
to-cyan-400
bg-clip-text
text-transparent
">

 Classroom

</span>

Smarter

</h1>


<p className="
text-gray-400
text-xl
mb-10
">

Attendance, classes,
students and assignments
all in one platform.

</p>


<button className="
bg-gradient-to-r
from-indigo-600
to-purple-600
px-8
py-4
rounded-2xl
hover:scale-105
duration-300
shadow-lg
shadow-indigo-500/20
">

Get Started

</button>

</motion.div>

</div>

</div>

)

}