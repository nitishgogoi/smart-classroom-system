const express =
require("express");

const router =
express.Router();

const User =
require("../models/User");



// all users

router.get(

"/all",

async(req,res)=>{

try{

const users =
await User.find();

res.json(users);

}

catch(err){

res.status(500)
.json(err);

}

}

);



// students

router.get(

"/students",

async(req,res)=>{

try{

const users =
await User.find({

role:"student"

});

res.json(users);

}

catch(err){

res.status(500)
.json(err);

}

}

);



// teachers

router.get(

"/teachers",

async(req,res)=>{

try{

const users =
await User.find({

role:"teacher"

});

res.json(users);

}

catch(err){

res.status(500)
.json(err);

}

}

);



module.exports =
router;