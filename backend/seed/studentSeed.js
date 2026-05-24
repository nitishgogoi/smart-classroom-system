require("dotenv").config();

const mongoose =
require("mongoose");

const bcrypt =
require("bcryptjs");

const User =
require("../models/User");


mongoose.connect(
process.env.MONGO_URI
);


async function seed(){

try{

await User.deleteMany({

role:"student"

});


const hash =
await bcrypt.hash(

"123456",
10

);


const branches=[

"Computer Engineering",

"Electrical Engineering",

"Printing Technology"

];


let students=[];



for(

const branch of branches

){

for(

let sem=1;

sem<=6;

sem++

){

const short =

branch
.split(" ")[0]
.toLowerCase();


students.push({

name:
`${short}Sem${sem}`,

email:
`${short}${sem}@gmail.com`,

password:
hash,

role:
"student",

branch,

semester:
sem

});

}

}



await User.insertMany(
students
);


console.log(
"Students Seeded"
);

process.exit();

}

catch(err){

console.log(err);

process.exit();

}

}


seed(); 