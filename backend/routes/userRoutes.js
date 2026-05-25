const express =
require("express");

const router =
express.Router();

const User =
require("../models/User");



/* -------------------
GET ALL USERS
/api/users
------------------- */

router.get(

"/",

async(req,res)=>{

try{

const users=

await User.find()

.select("-password");


res.json(
users
);

}

catch(err){

res.status(500)
.json(err);

}

}

);




/* -------------------
GET STUDENTS
/api/users/students
------------------- */

router.get(

"/students",

async(req,res)=>{

try{

const students=

await User.find({

role:"student"

})

.select("-password");


res.json(
students
);

}

catch(err){

res.status(500)
.json(err);

}

}

);





/* -------------------
GET TEACHERS
/api/users/teachers
------------------- */

router.get(

"/teachers",

async(req,res)=>{

try{

const teachers=

await User.find({

role:"teacher"

})

.select("-password");


res.json(
teachers
);

}

catch(err){

res.status(500)
.json(err);

}

}

);





module.exports =
router;