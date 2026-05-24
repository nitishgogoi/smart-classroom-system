const Assignment =
require("../models/Assignment");


exports.submitAssignment =
async(req,res)=>{

try{

const assignment =
await Assignment.create(req.body);

res.json(assignment);

}catch(err){

res.status(500).json({
message:err.message
})

}

};



exports.getAssignments =
async(req,res)=>{

const data =
await Assignment.find();

res.json(data);

};