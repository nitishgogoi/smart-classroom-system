require("dotenv").config();
const mongoose = require("mongoose");
const Subject = require("../models/Subject");

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo Connected"))
.catch(err=>console.log(err));

const subjects = [

/* =====================
COMMON SEM 1
ALL BRANCHES
===================== */

...[
"Computer Engineering",
"Electrical Engineering",
"Printing Technology"

].flatMap(branch => [

{
branch,
semester:1,
code:"BS-101",
name:"Mathematics-I"
},

{
branch,
semester:1,
code:"BS-102",
name:"Applied Physics-I"
},

{
branch,
semester:1,
code:"BS-105",
name:"Applied Chemistry"
},

{
branch,
semester:1,
code:"HS-101",
name:"Communication Skills in English"
},

{
branch,
semester:1,
code:"ES-101",
name:"Engineering Graphics"
},

{
branch,
semester:1,
code:"ES-103",
name:"Engineering Workshop Practice"
},

{
branch,
semester:1,
code:"BS-107",
name:"Applied Physics Lab-I"
},

{
branch,
semester:1,
code:"BS-109",
name:"Applied Chemistry Lab-I"
},

{
branch,
semester:1,
code:"HS-103",
name:"Sports and Yoga"
},

{
branch,
semester:1,
code:"HS-105",
name:"Communication Skills Lab"
}

]),


/* =====================
COMPUTER ENGINEERING
===================== */

{
branch:"Computer Engineering",
semester:4,
code:"CO401",
name:"Data Structure"
},

{
branch:"Computer Engineering",
semester:4,
code:"CO402",
name:"Advanced C++"
},

{
branch:"Computer Engineering",
semester:4,
code:"CO403",
name:"Microprocessor"
},

{
branch:"Computer Engineering",
semester:4,
code:"CO404",
name:"Hardware Networking"
},

{
branch:"Computer Engineering",
semester:5,
code:"CO501",
name:"Database Management System"
},

{
branch:"Computer Engineering",
semester:5,
code:"CO502",
name:"Operating System"
},

{
branch:"Computer Engineering",
semester:5,
code:"CO503",
name:"Java Programming"
},

{
branch:"Computer Engineering",
semester:6,
code:"CO601",
name:"Mobile Computing"
},

{
branch:"Computer Engineering",
semester:6,
code:"CO602",
name:"Cryptography"
},

{
branch:"Computer Engineering",
semester:6,
code:"CO603",
name:"Software Engineering"
},



/* =====================
ELECTRICAL
===================== */

{
branch:"Electrical Engineering",
semester:3,
code:"EI301",
name:"Principles of Electrical Engineering"
},

{
branch:"Electrical Engineering",
semester:3,
code:"SC303",
name:"Mathematics III"
},

{
branch:"Electrical Engineering",
semester:4,
code:"EL401",
name:"Electrical Circuit Network"
},

{
branch:"Electrical Engineering",
semester:4,
code:"EL402",
name:"Electrical Electronics Drawing"
},

{
branch:"Electrical Engineering",
semester:4,
code:"EL403",
name:"Electrical Measurement"
},

{
branch:"Electrical Engineering",
semester:5,
code:"EL501",
name:"Electrical Power"
},

{
branch:"Electrical Engineering",
semester:5,
code:"EL503",
name:"Electrical Measurement II"
},

{
branch:"Electrical Engineering",
semester:6,
code:"EL601",
name:"Electrical Estimation"
},

{
branch:"Electrical Engineering",
semester:6,
code:"EL602",
name:"AC Distribution"
},

{
branch:"Electrical Engineering",
semester:6,
code:"EL603",
name:"Switchgear Protection"
},



/* =====================
PRINTING TECHNOLOGY
===================== */

{
branch:"Printing Technology",
semester:3,
code:"PT301",
name:"Printing Process"
},

{
branch:"Printing Technology",
semester:3,
code:"PT302",
name:"Prepress Reprotechnique"
},

{
branch:"Printing Technology",
semester:4,
code:"PT401",
name:"Visual Design DTP"
},

{
branch:"Printing Technology",
semester:4,
code:"PT402",
name:"Image Processing"
},

{
branch:"Printing Technology",
semester:5,
code:"PT501",
name:"Digital Prepress"
},

{
branch:"Printing Technology",
semester:5,
code:"PT502",
name:"Offset Printing Technology"
},

{
branch:"Printing Technology",
semester:5,
code:"PT503",
name:"Printer Material Science"
},

{
branch:"Printing Technology",
semester:6,
code:"PT601",
name:"Binding Finishing"
},

{
branch:"Printing Technology",
semester:6,
code:"PT602",
name:"Estimating Costing"
},

{
branch:"Printing Technology",
semester:6,
code:"PT603",
name:"Graphic Painting Technique"
}

];


async function seed(){

try{

await Subject.deleteMany();

await Subject.insertMany(subjects);

console.log(
"Subjects Seeded Successfully"
);

process.exit();

}

catch(err){

console.log(err);

process.exit();

}

}

seed();