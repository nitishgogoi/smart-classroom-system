const express =
require("express");

const router =
express.Router();

const Grade =
require("../models/Grade");


router.post(

"/",

async(req,res)=>{

const data=
await Grade.create(

req.body

);

res.json(data);

}

);


router.get(

"/",

async(req,res)=>{

const data=
await Grade.find();

res.json(data);

}

);


module.exports=
router;