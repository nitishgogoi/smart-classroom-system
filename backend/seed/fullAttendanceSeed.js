require("dotenv").config();

const mongoose =
require("mongoose");

const Attendance =
require("../models/Attendance");

mongoose
.connect(process.env.MONGO_URI)
.then(async()=>{

await Attendance.deleteMany();

await Attendance.insertMany([

/* ==========
COMPUTER ENG
SEM 3
========== */

{
student:"ABHIJIT JENA",
rollNo:"NAL/24/CS/001",
branch:"Computer Engineering",
semester:3,
subject:"DBMS",
present:0,
total:8,
percentage:0
},

{
student:"ABHIJIT JENA",
rollNo:"NAL/24/CS/001",
branch:"Computer Engineering",
semester:3,
subject:"PC&C++",
present:3,
total:12,
percentage:25
},

{
student:"ABHIJIT JENA",
rollNo:"NAL/24/CS/001",
branch:"Computer Engineering",
semester:3,
subject:"CN",
present:4,
total:10,
percentage:40
},

{
student:"ABHIJIT JENA",
rollNo:"NAL/24/CS/001",
branch:"Computer Engineering",
semester:3,
subject:"IWT",
present:0,
total:10,
percentage:0
},


{
student:"ASHUTOSH TAMULI",
rollNo:"NAL/24/CS/004",
branch:"Computer Engineering",
semester:3,
subject:"DBMS",
present:6,
total:8,
percentage:75
},

{
student:"ASHUTOSH TAMULI",
rollNo:"NAL/24/CS/004",
branch:"Computer Engineering",
semester:3,
subject:"PC&C++",
present:9,
total:12,
percentage:75
},

{
student:"ASHUTOSH TAMULI",
rollNo:"NAL/24/CS/004",
branch:"Computer Engineering",
semester:3,
subject:"CN",
present:10,
total:10,
percentage:100
},

{
student:"ASHUTOSH TAMULI",
rollNo:"NAL/24/CS/004",
branch:"Computer Engineering",
semester:3,
subject:"IWT",
present:10,
total:10,
percentage:100
},


{
student:"BIJIT SAINARY",
rollNo:"NAL/24/CS/006",
branch:"Computer Engineering",
semester:3,
subject:"DBMS",
present:8,
total:8,
percentage:100
},

{
student:"BIJIT SAINARY",
rollNo:"NAL/24/CS/006",
branch:"Computer Engineering",
semester:3,
subject:"PC&C++",
present:12,
total:12,
percentage:100
},

{
student:"BIJIT SAINARY",
rollNo:"NAL/24/CS/006",
branch:"Computer Engineering",
semester:3,
subject:"CN",
present:10,
total:10,
percentage:100
},

{
student:"BIJIT SAINARY",
rollNo:"NAL/24/CS/006",
branch:"Computer Engineering",
semester:3,
subject:"IWT",
present:10,
total:10,
percentage:100
},

/* CONTINUE SAME FORMAT FOR
ALL STUDENTS */

/* ===========
COMPUTER SEM4
NC/DC DATA
=========== */

{
student:"ABHIJIT JENA",
rollNo:"NAL/24/CS/001",
branch:"Computer Engineering",
semester:4,
subject:"OS",
percentage:100
},

{
student:"ABHIJIT JENA",
rollNo:"NAL/24/CS/001",
branch:"Computer Engineering",
semester:4,
subject:"CAO",
percentage:100
},

/* add remaining students */


/* ==========
ELECTRICAL
SEM4
========== */

{
student:"JYOTIRMAY SARANIA",
branch:"Electrical Engineering",
semester:4,
subject:"AC",
percentage:0
},

/* ==========
PRINTING
SEM4
========== */

{
student:"CHIRANJIB BARMAN",
branch:"Printing Technology",
semester:4,
subject:"T&C",
percentage:100
},

/* ==========
ELECTRICAL
SEM6
========== */

/* ==========
PRINTING
SEM6
========== */

]);

console.log(
"Attendance Seeded"
);

process.exit();

});