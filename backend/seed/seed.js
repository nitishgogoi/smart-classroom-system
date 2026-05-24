require("dotenv").config();

const mongoose =
require("mongoose");

const User =
require("../models/User");

const Subject =
require("../models/Subject");


async function seed(){

try{

await mongoose.connect(
process.env.MONGO_URI
);

console.log(
"Mongo Connected"
);



await User.deleteMany({});
await Subject.deleteMany({});



await User.create([

{

name:"Rahul",

email:"rahul@gmail.com",

password:"123456",

role:"student",

branch:
"Computer Engineering",

semester:3

},

{

name:"Riki",

email:"riki@gmail.com",

password:"123456",

role:"student",

branch:
"Printing Technology",

semester:6

},

{

name:"Teacher1",

email:"teacher@gmail.com",

password:"123456",

role:"teacher"

}

]);



await Subject.create([

{

code:"CO601",

name:"Mobile Computing",

branch:
"Computer Engineering",

semester:6

},

{

code:"CO602",

name:"Cryptography",

branch:
"Computer Engineering",

semester:6

},

{

code:"CO603",

name:"Software Engineering",

branch:
"Computer Engineering",

semester:6

},

{

code:"CS401",

name:"Operating System",

branch:
"Computer Engineering",

semester:3

},

{

code:"CS402",

name:"DBMS",

branch:
"Computer Engineering",

semester:3

}

]);


console.log(
"Dummy data inserted"
);

process.exit();

}

catch(err){

console.log(err);

process.exit();

}

}


seed();