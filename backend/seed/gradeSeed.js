require("dotenv").config();
const mongoose=require("mongoose");

const Grade=require("../models/Grade");

async function seed(){

await mongoose.connect(
process.env.MONGO_URI
);

await Grade.deleteMany({});

await Grade.create([

{
student:"ComputerSem6",
subject:"Mobile Computing",
marks:78,
total:100,
grade:"A"
},

{
student:"ComputerSem6",
subject:"Cryptography",
marks:65,
total:100,
grade:"B"
},

{
student:"ComputerSem6",
subject:"Software Engineering",
marks:88,
total:100,
grade:"A+"
}

]);

console.log("Grades inserted");

process.exit();

}

seed();