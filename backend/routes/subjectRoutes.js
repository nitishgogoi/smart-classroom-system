const express =
require("express");

const router =
express.Router();

const Subject =
require("../models/Subject");


router.get(
"/",

async(req,res)=>{

try{

const {

branch,
semester

}

=
req.query;


let filter = {};

if(branch)
filter.branch =
branch;

if(semester)
filter.semester =
semester;


const subjects =
await Subject.find(
filter
);

res.json(
subjects
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