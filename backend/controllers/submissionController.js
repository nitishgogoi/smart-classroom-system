const Submission =
require("../models/Submission");


exports.submit =
async(req,res)=>{

try{

const data =
await Submission.create(
req.body
);

res.json(data);

}

catch(err){

res.status(500)
.json(err);

}

};



exports.get =
async(req,res)=>{

const data =
await Submission.find();

res.json(data);

};