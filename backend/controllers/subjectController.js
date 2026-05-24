const Subject =
require("../models/Subject");



exports.createSubject =
async(req,res)=>{

try{

const data =
await Subject.create(

req.body

);

res.json(
data
);

}

catch(err){

res.status(500)
.json(err);

}

};



exports.getSubjects =
async(req,res)=>{

try{

const data =
await Subject.find();

res.json(
data
);

}

catch(err){

res.status(500)
.json(err);

}

};